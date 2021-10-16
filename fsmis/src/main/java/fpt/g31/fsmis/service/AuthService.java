package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.LoginDtoIn;
import fpt.g31.fsmis.dto.input.RegistrationDtoIn;
import fpt.g31.fsmis.dto.output.AuthTokenDtoOut;
import fpt.g31.fsmis.entity.Role;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.repository.UserRepos;
import fpt.g31.fsmis.repository.WardRepos;
import fpt.g31.fsmis.security.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final WardRepos wardRepos;
    private final UserRepos userRepos;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @Transactional
    public void register(RegistrationDtoIn registrationDtoIn) {
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
                .status(false)
                .roles(Collections.singleton(Role.ROLE_USER))
                .build();
        userRepos.save(user);
    }

    public AuthTokenDtoOut login(LoginDtoIn loginDtoIn) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDtoIn.getPhone(), loginDtoIn.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateJwtToken(authentication);
        return AuthTokenDtoOut.builder()
                .authToken(token)
                .phone(loginDtoIn.getPhone())
                .roles(authentication.getAuthorities().iterator().next().toString())
                .build();
    }
}
