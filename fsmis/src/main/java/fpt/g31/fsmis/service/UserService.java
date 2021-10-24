package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ChangePasswordDtoIn;
import fpt.g31.fsmis.dto.input.PersonalInfoDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.repository.*;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepos userRepos;
    private final WardRepos wardRepos;
    private final ModelMapper modelMapper;
    private final JwtFilter jwtFilter;
    private final PasswordEncoder passwordEncoder;

    public PersonalInfoDtoOut getPersonalInformation(HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        PersonalInfoDtoOut personalInformationDtoOut =
                modelMapper.map(user, PersonalInfoDtoOut.class);
        personalInformationDtoOut.setDob(ServiceUtils.convertDateToString(user.getDob()));
        personalInformationDtoOut.setAddressFromWard(ServiceUtils.getAddressByWard(user.getWard()));
        return personalInformationDtoOut;
    }

    public String savePersonalInformation(HttpServletRequest request, PersonalInfoDtoIn personalInfoDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        user.setAvatarUrl(personalInfoDtoIn.getAvatarUrl());
        user.setFullName(personalInfoDtoIn.getFullName());
        user.setDob(ServiceUtils.convertStringToDate(personalInfoDtoIn.getDob()));
        user.setGender(personalInfoDtoIn.getGender());
        user.setAddress(personalInfoDtoIn.getAddress());
        user.setWard(wardRepos.getById(personalInfoDtoIn.getWardId()));
        userRepos.save(user);
        return "Thay đổi thông tin thành công";
    }

    public String changePassword(HttpServletRequest request, ChangePasswordDtoIn changePasswordDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        if (!passwordEncoder.matches(changePasswordDtoIn.getOldPassword(), user.getPassword())) {
            throw new ValidationException("Mật khẩu không đúng");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDtoIn.getNewPassword()));
        userRepos.save(user);
        return "Thay đổi mật khẩu thành công";
    }

    public String changePhone(HttpServletRequest request, String newPhone) {
        User user = jwtFilter.getUserFromToken(request);
        user.setPhone(newPhone);
        userRepos.save(user);
        return "Thay đổi số điện thoại thành công";
    }
}
