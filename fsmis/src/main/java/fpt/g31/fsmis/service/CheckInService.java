package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.CheckInHistoryPersonalDtoOut;
import fpt.g31.fsmis.dto.output.PaginationDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.dto.output.UserCheckInDtoOut;
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

    public UserCheckInDtoOut checkIn(String qrString, Long fishingLocationId) {
        User user = userRepos.findByQrString(qrString)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy tài khoản!"));
        if (!user.isAvailable()) {
            throw new ValidationException("Không được check-in tại điểm khác khi đang câu!");
        }
        FishingLocation fishingLocation = fishingLocationRepos.findById(fishingLocationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu!"));
        if (fishingLocation.getOwner().equals(user)) {
            throw new ValidationException("Chủ hồ không được check in tại hồ của mình!");
        }
        if (fishingLocation.getEmployeeList().contains(user)) {
            throw new ValidationException("Nhân viên không được check in tại nơi làm việc của mình!");
        }
        CheckIn checkIn = new CheckIn();
        checkIn.setUser(user);
        checkIn.setFishingLocation(fishingLocation);
        checkIn.setCheckInTime(LocalDateTime.now());
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
        List<CheckInHistoryPersonalDtoOut> output = new ArrayList<>();
        for (CheckIn checkIn : checkInList) {
            CheckInHistoryPersonalDtoOut item = CheckInHistoryPersonalDtoOut.builder()
                    .id(checkIn.getId())
                    .locationId(checkIn.getFishingLocation().getId())
                    .locationName(checkIn.getFishingLocation().getName())
                    .checkInTime(ServiceUtils.convertDateToString(checkIn.getCheckInTime()))
                    .checkOutTime(checkIn.getCheckOutTime() == null
                            ? "Bạn chưa check-out"
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
        if (user.isAvailable()) {
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
        return new ResponseTextDtoOut(checkInRepos.existsByUserIdAndFishingLocationId(user.getId(), locationId)?"true":"false");
    }
}
