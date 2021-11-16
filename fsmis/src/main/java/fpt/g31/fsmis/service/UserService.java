package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ChangePasswordDtoIn;
import fpt.g31.fsmis.dto.input.PersonalInfoDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.Notification;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.repository.*;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public ResponseTextDtoOut changePhone(HttpServletRequest request, String newPhone) {
        User user = jwtFilter.getUserFromToken(request);
        user.setPhone(newPhone);
        userRepos.save(user);
        return new ResponseTextDtoOut("Thay đổi số điện thoại thành công");
    }

    public PaginationDtoOut getPersonalNotification(HttpServletRequest request, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);

        // CUSTOM PAGING
        List<Notification> notifications = user.getNotificationSet();
        PageRequest pageRequest = PageRequest.of(pageNo - 1, 10);
        int total = notifications.size();
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), total);
        if (start > end) {
            start = end = 0;
        }
        Page<Notification> notificationList = new PageImpl<>(notifications.subList(start, end), pageRequest, total);

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
                .isAvailable(user.getAvailable())
                .fishingLocationItemDtoOut(fishingLocationItemDtoOut)
                .build();
    }

    public PaginationDtoOut getAccountList(int pageNo, String phone) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<AdminAccountItemDtoOut> output = new ArrayList<>();
        if (!phone.isEmpty()) {
            Optional<User> accountOptional = userRepos.findByPhone(phone);
            if (accountOptional.isPresent()) {
                User account = accountOptional.get();
                AdminAccountItemDtoOut dtoOut =AdminAccountItemDtoOut.builder()
                        .id(account.getId())
                        .name(account.getFullName())
                        .active(account.getActive())
                        .avatar(account.getAvatarUrl())
                        .phone(account.getPhone())
                        .build();
                output.add(dtoOut);
            }
            return PaginationDtoOut.builder()
                    .totalPage(1)
                    .totalItem(1)
                    .items(output)
                    .build();
        }
        Page<User> accountList = userRepos.findAllByIdNot(PageRequest.of(pageNo - 1, 10), 1L);
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
}
