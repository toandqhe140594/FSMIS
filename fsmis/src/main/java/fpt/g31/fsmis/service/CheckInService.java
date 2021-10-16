package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.CheckInRepos;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CheckInService {
    private final CheckInRepos checkInRepos;
    private final UserRepos userRepos;
    private final FishingLocationRepos fishingLocationRepos;

    public String checkIn(String qrString, Long fishingLocationId) {
        Optional<User> userOptional = userRepos.findByQrString(qrString);
        if (!userOptional.isPresent()) {
            throw new NotFoundException("Không tìm thấy tài khoản!");
        }
        User user = userOptional.get();
        Optional<FishingLocation> fishingLocationOptional = fishingLocationRepos.findById(fishingLocationId);
        if (!fishingLocationOptional.isPresent()) {
            throw new NotFoundException("Không tìm thấy hồ câu!");
        }
        FishingLocation fishingLocation = fishingLocationOptional.get();
        if (fishingLocation.getOwner().equals(user)) {
            throw new ValidationException("Chủ hồ không được check in tại hồ của mình!");
        }
        if (fishingLocation.getEmployeeList().contains(user)) {
            throw new ValidationException("Nhân viên không được check in tại nơi làm việc của mình!");
        }
        CheckIn checkIn = new CheckIn();
        checkIn.setUser(userOptional.get());
        checkIn.setFishingLocation(fishingLocationOptional.get());
        checkIn.setCheckInTime(LocalDateTime.now());
        checkInRepos.save(checkIn);
        return "Check in thành công";
    }
}
