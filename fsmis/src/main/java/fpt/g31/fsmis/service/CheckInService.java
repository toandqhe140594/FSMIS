package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.CheckInDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.CheckInRepos;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.UserRepos;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CheckInService {
    private final CheckInRepos checkInRepos;
    private final UserRepos userRepos;
    private final FishingLocationRepos fishingLocationRepos;
    private final JwtFilter jwtFilter;

    public UserCheckInDtoOut performCheckIn(CheckInDtoIn checkInDtoIn, Long fishingLocationId, HttpServletRequest request) {
        User performer = jwtFilter.getUserFromToken(request);
        User user = userRepos.findByQrString(checkInDtoIn.getQr())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản!"));
        if (Boolean.FALSE.equals(user.getAvailable())) {
            throw new ValidationException("Không được check-in tại điểm khác khi đang câu!");
        }
        FishingLocation location = fishingLocationRepos.findById(fishingLocationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu!"));
        if (location.getOwner().equals(user)) {
            throw new ValidationException("Chủ hồ không được check in tại hồ của mình!");
        }
        if (location.getEmployeeList().contains(user)) {
            throw new ValidationException("Nhân viên không được check in tại nơi làm việc của mình!");
        }
        if (!location.getOwner().equals(performer) && !location.getEmployeeList().contains(performer)) {
            throw new ValidationException("Không có quyền thực hiện check in");
        }
        CheckIn checkIn = new CheckIn();
        checkIn.setUser(user);
        checkIn.setFishingLocation(location);
        checkIn.setCheckInTime(LocalDateTime.now());
        checkIn.setPerfomrerId(performer.getId());
        checkInRepos.save(checkIn);
        user.setAvailable(false);
        userRepos.save(user);
        return UserCheckInDtoOut.builder()
                .avatar(user.getAvatarUrl())
                .name(user.getFullName())
                .checkInTime(ServiceUtils.convertDateToString(LocalDateTime.now()))
                .build();
    }

    public PaginationDtoOut getPersonalCheckInHistoryList(HttpServletRequest request, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);
        Page<CheckIn> checkInList = checkInRepos.findByUserIdOrderByCheckInTimeDesc(user.getId(), PageRequest.of(pageNo - 1, 10));
        List<PersonalCheckInHistoryDtoOut> output = new ArrayList<>();
        for (CheckIn checkIn : checkInList) {
            PersonalCheckInHistoryDtoOut item = PersonalCheckInHistoryDtoOut.builder()
                    .id(checkIn.getId())
                    .locationId(checkIn.getFishingLocation().getId())
                    .locationName(checkIn.getFishingLocation().getName())
                    .checkInTime(ServiceUtils.convertDateToString(checkIn.getCheckInTime()))
                    .checkOutTime(checkIn.getCheckOutTime() == null
                            ? "Chưa check-out"
                            : ServiceUtils.convertDateToString(checkIn.getCheckOutTime()))
                    .build();
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(checkInList.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }

    public UserCheckInDtoOut checkOut(HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        if (Boolean.TRUE.equals(user.getAvailable())) {
            throw new ValidationException("Bạn chưa check-in");
        }
        CheckIn checkIn = checkInRepos.findFirstByUserIdOrderByCheckInTimeDesc(user.getId());
        checkIn.setCheckOutTime(LocalDateTime.now());
        checkInRepos.save(checkIn);
        user.setAvailable(true);
        userRepos.save(user);
        return UserCheckInDtoOut.builder()
                .checkInTime(ServiceUtils.convertDateToString(checkIn.getCheckInTime()))
                .checkOutTime(ServiceUtils.convertDateToString(checkIn.getCheckOutTime()))
                .build();
    }

    public ResponseTextDtoOut isCheckedIn(Long locationId, HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        if (!fishingLocationRepos.existsById(locationId)) {
            throw new NotFoundException("Không tìm thấy khu hồ!");
        }
        return new ResponseTextDtoOut(Boolean.TRUE.equals(checkInRepos.existsByUserIdAndFishingLocationId(user.getId(), locationId)) ? "true" : "false");
    }

    public PaginationDtoOut getLocationCheckInHistory(Long locationId, HttpServletRequest request, Integer pageNo, String beginDateString, String endDateString) {
        if (pageNo <= 0) {
            throw new ValidationException("Số trang không hợp lệ");
        }
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khu hồ"));
        if (!location.getOwner().equals(user)
                && !location.getEmployeeList().contains(user)) {
            throw new ValidationException("Không có quyền truy cập");
        }
        LocalDateTime beginDate = beginDateString == null ?
                LocalDateTime.of(1970, 1, 1, 0, 0)
                : ServiceUtils.convertStringToDate(beginDateString);
        LocalDateTime endDate = endDateString == null ?
                LocalDateTime.now()
                : ServiceUtils.convertStringToDate(endDateString).plusDays(1);
        Page<CheckIn> checkInList = checkInRepos.findByFishingLocationIdAndCheckInTimeBetweenOrderByCheckInTimeDesc
                (locationId, beginDate, endDate, PageRequest.of(pageNo - 1, 10));
        List<LocationCheckInHistoryDtoOut> output = new ArrayList<>();
        for (CheckIn checkIn : checkInList) {
            LocationCheckInHistoryDtoOut item = LocationCheckInHistoryDtoOut.builder()
                    .id(checkIn.getId())
                    .name(checkIn.getUser().getFullName())
                    .avatar(checkIn.getUser().getAvatarUrl())
                    .checkInTime(ServiceUtils.convertDateToString(checkIn.getCheckInTime()))
                    .checkOutTime(checkIn.getCheckOutTime() == null
                            ? "Chưa check-out"
                            : ServiceUtils.convertDateToString(checkIn.getCheckOutTime()))
                    .performerName(userRepos.getById(checkIn.getPerfomrerId()).getFullName())
                    .build();
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(checkInList.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }
}
