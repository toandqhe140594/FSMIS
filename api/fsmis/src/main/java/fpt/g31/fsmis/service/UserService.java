package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ChangePasswordDtoIn;
import fpt.g31.fsmis.dto.input.ChangePhoneDtoIn;
import fpt.g31.fsmis.dto.input.PersonalInfoDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.Notification;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.*;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private static final String INVALID_PAGE_NUMBER = "Số trang không hợp lệ";
    private final UserRepos userRepos;
    private final WardRepos wardRepos;
    private final CatchesRepos catchesRepos;
    private final ModelMapper modelMapper;
    private final JwtFilter jwtFilter;
    private final PasswordEncoder passwordEncoder;
    private final CheckInRepos checkInRepos;
    private final ReviewRepos reviewRepos;
    private final NotificationRepos notificationRepos;
    private final BannedPhoneRepos bannedPhoneRepos;

    public PersonalInfoDtoOut getPersonalInformation(HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        PersonalInfoDtoOut output =
                modelMapper.map(user, PersonalInfoDtoOut.class);
        output.setDob(ServiceUtils.convertDateToString(user.getDob()));
        output.setAddressFromWard(ServiceUtils.getAddressByWard(user.getWard()));
        output.setCatchesCount(catchesRepos.countByUserId(user.getId()));
        return output;
    }

    public ResponseTextDtoOut savePersonalInformation(HttpServletRequest request, PersonalInfoDtoIn personalInfoDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        user.setAvatarUrl(personalInfoDtoIn.getAvatarUrl());
        user.setFullName(personalInfoDtoIn.getFullName());
        user.setDob(ServiceUtils.convertStringToDate(personalInfoDtoIn.getDob()));
        user.setGender(personalInfoDtoIn.getGender());
        user.setAddress(personalInfoDtoIn.getAddress());
        user.setWard(wardRepos.getById(personalInfoDtoIn.getWardId()));
        userRepos.save(user);

        return new ResponseTextDtoOut("Thay đổi thông tin thành công.");
    }

    public ResponseTextDtoOut changePassword(HttpServletRequest request, ChangePasswordDtoIn changePasswordDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        if (!passwordEncoder.matches(changePasswordDtoIn.getOldPassword(), user.getPassword())) {
            throw new ValidationException("Mật khẩu không đúng");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDtoIn.getNewPassword()));
        userRepos.save(user);
        return new ResponseTextDtoOut("Thay đổi mật khẩu thành công");
    }

    public ResponseTextDtoOut changePhone(HttpServletRequest request, ChangePhoneDtoIn changePhoneDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        if (!passwordEncoder.matches(changePhoneDtoIn.getPassword(), user.getPassword())) {
            throw new ValidationException("Mật khẩu không đúng");
        }
        if (changePhoneDtoIn.getNewPhone().equals(user.getPhone())) {
            throw new ValidationException("Số điện thoại mới không được trùng số điện thoại cũ");
        }
        if (bannedPhoneRepos.existsById(changePhoneDtoIn.getNewPhone())){
            throw new ValidationException("Số điện thoại bị cấm khỏi hệ thống");
        }
        if (Boolean.TRUE.equals(userRepos.existsByPhone(changePhoneDtoIn.getNewPhone()))) {
            throw new ValidationException("Số điện thoại đã được sử dụng, vui lòng đăng nhập hoặc dùng số điện thoại khác");
        }
        user.setPhone(changePhoneDtoIn.getNewPhone());
        userRepos.save(user);
        return new ResponseTextDtoOut("Thay đổi số điện thoại thành công");
    }

    public PaginationDtoOut getPersonalNotification(HttpServletRequest request, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);
        Page<Notification> notificationList = notificationRepos.findAllByUserSetOrderByTimeDesc(user, PageRequest.of(pageNo-1, 10));
        List<NotificationDtoOut> output = new ArrayList<>();
        for (Notification notification : notificationList) {
            NotificationDtoOut item = modelMapper.map(notification, NotificationDtoOut.class);
            item.setTime(ServiceUtils.convertDateToString(notification.getTime()));
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(notificationList.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }

    public StaffDtoOut findUserByPhone(String phone) {
        User user = userRepos.findByPhone(phone.trim())
                .orElseThrow(() -> new ValidationException("Tài khoản không tồn tại"));
        return StaffDtoOut.builder()
                .id(user.getId())
                .name(user.getFullName())
                .avatar(user.getAvatarUrl())
                .phone(user.getPhone())
                .build();
    }

    public IsAvailableDtoOut isAvailable(HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocationItemDtoOut fishingLocationItemDtoOut = null;
        if (Boolean.FALSE.equals(user.getAvailable())) {
            FishingLocation location = checkInRepos.findFirstByUserIdOrderByCheckInTimeDesc(user.getId()).getFishingLocation();
            fishingLocationItemDtoOut = FishingLocationItemDtoOut.builder()
                    .id(location.getId())
                    .name(location.getName())
                    .image(ServiceUtils.splitString(location.getImageUrl()).get(0))
                    .verify(location.getVerify())
                    .closed(location.getClosed())
                    .address(ServiceUtils.getAddress(location.getAddress(), location.getWard()))
                    .score(reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(location.getId()))
                    .build();
        }
        return IsAvailableDtoOut.builder()
                .available(user.getAvailable())
                .fishingLocationItemDtoOut(fishingLocationItemDtoOut)
                .build();
    }

    public PaginationDtoOut adminGetAccountList(int pageNo, String input) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        Page<User> accountList;
        List<AdminAccountItemDtoOut> output = new ArrayList<>();
        if (!input.isEmpty()) {
            if (input.matches("^[0-9]+$")){
                accountList = userRepos.findAllByPhoneLikeAndIdNot("%" + input + "%", PageRequest.of(pageNo - 1, 10), 1L);
            } else {
                accountList = userRepos.findAllByFullNameContainsIgnoreCaseAndIdNot(input, PageRequest.of(pageNo - 1, 10), 1L);
            }
        } else {
            accountList = userRepos.findAllByIdNot(PageRequest.of(pageNo - 1, 10), 1L);
        }
        for (User account : accountList) {
            AdminAccountItemDtoOut dtoOut = AdminAccountItemDtoOut.builder()
                    .id(account.getId())
                    .name(account.getFullName())
                    .active(account.getActive())
                    .avatar(account.getAvatarUrl())
                    .phone(account.getPhone())
                    .build();
            output.add(dtoOut);
        }
        return PaginationDtoOut.builder()
                .totalPage(accountList.getTotalPages())
                .totalItem(accountList.getTotalElements())
                .items(output)
                .build();
    }

    public ResponseTextDtoOut adminChangeActive(Long userId) {
        User user = userRepos.findById(userId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản"));
        user.setActive(!user.getActive());
        userRepos.save(user);
        String output = Boolean.TRUE.equals(user.getActive()) ? "Mở khóa tài khoản thành công" : "Khóa tài khoản thành công";
        return new ResponseTextDtoOut(output);
    }

    public UserDtoOut adminGetAccount(Long userId) {
        User user = userRepos.findById(userId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản"));
        return UserDtoOut.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .avatar(user.getAvatarUrl())
                .dob(ServiceUtils.convertDateToString(user.getDob()))
                .phone(user.getPhone())
                .gender(user.getGender())
                .address(ServiceUtils.getAddress(user.getAddress(), user.getWard()))
                .active(user.getActive())
                .build();
    }
}
