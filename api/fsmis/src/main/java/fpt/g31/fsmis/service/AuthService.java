package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.AuthDtoIn;
import fpt.g31.fsmis.dto.input.RegistrationDtoIn;
import fpt.g31.fsmis.dto.output.AuthTokenDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.Role;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.BannedException;
import fpt.g31.fsmis.repository.BannedPhoneRepos;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.UserRepos;
import fpt.g31.fsmis.repository.WardRepos;
import fpt.g31.fsmis.security.JwtProvider;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final WardRepos wardRepos;
    private final UserRepos userRepos;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final BannedPhoneRepos bannedPhoneRepos;
    private final FishingLocationRepos fishingLocationRepos;

    @Transactional
    public ResponseTextDtoOut register(RegistrationDtoIn registrationDtoIn) {
        if (Boolean.TRUE.equals(userRepos.existsByPhone(registrationDtoIn.getPhone()))) {
            throw new ValidationException("Số điện thoại này đã tồn tại trong hệ thống");
        }
        if (bannedPhoneRepos.existsById(registrationDtoIn.getPhone())) {
            throw new ValidationException("Số điện thoại bị cấm khỏi hệ thống");
        }
        User user = User.builder()
                .fullName(registrationDtoIn.getFullName())
                .password(passwordEncoder.encode(registrationDtoIn.getPassword()))
                .phone(registrationDtoIn.getPhone())
                .dob(registrationDtoIn.getDob())
                .address(registrationDtoIn.getAddress())
                .ward(wardRepos.getById(registrationDtoIn.getWardId()))
                .qrString(UUID.randomUUID().toString())
                .avatarUrl("http://picsum.photos/200")
                .gender(registrationDtoIn.getGender())
                .active(true)
                .available(true)
                .roles(Collections.singleton(Role.ROLE_USER))
                .build();
        userRepos.save(user);
        List<FishingLocation> pendingLocationList = fishingLocationRepos.findByPhoneAndPendingIsTrue(user.getPhone());
        for (FishingLocation location :
                pendingLocationList) {
            location.setOwner(user);
            fishingLocationRepos.save(location);
        }
        return new ResponseTextDtoOut("Đăng ký thành công");
    }

    @SneakyThrows
    public Object login(AuthDtoIn authDtoIn) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authDtoIn.getPhone(), authDtoIn.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepos.findByPhone(authDtoIn.getPhone())
                .orElseThrow(() -> new ValidationException("Tài khoản không tồn tại!"));
        if (Boolean.FALSE.equals(user.getActive())) {
            BannedException bannedException = new BannedException();
            bannedException.setName(user.getFullName());
            bannedException.setBannedPhone(bannedPhoneRepos.getById(user.getPhone()));
            throw bannedException;
        }
        String token = jwtProvider.generateJwtToken(authentication);
        return AuthTokenDtoOut.builder()
                .authToken(token)
                .id(user.getId())
                .phone(user.getPhone())
                .qrString(user.getQrString())
                .roles(authentication.getAuthorities().iterator().next().toString())
                .build();
    }

    public ResponseTextDtoOut changeForgotPassword(AuthDtoIn authDtoIn) {
        User user = userRepos.findByPhone(authDtoIn.getPhone())
                .orElseThrow(() -> new ValidationException("Tài khoản không tồn tại"));
        user.setPassword(passwordEncoder.encode(authDtoIn.getPassword()));
        userRepos.save(user);
        return new ResponseTextDtoOut("Đổi mật khẩu thành công");
    }
}
