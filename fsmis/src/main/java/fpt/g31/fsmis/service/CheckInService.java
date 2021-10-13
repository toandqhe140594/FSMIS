package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.FishingLocationNotFoundException;
import fpt.g31.fsmis.exception.UserNotFoundException;
import fpt.g31.fsmis.repository.CheckInRepos;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CheckInService {
    private final CheckInRepos checkInRepos;
    private final UserRepos userRepos;
    private final FishingLocationRepos fishingLocationRepos;

    public CheckIn userCheckInFishingSpot(Long userId, Long fishingLocationId) {
        Optional<User> userOptional = userRepos.findById(userId);
        Optional<FishingLocation> fishingLocationOptional = fishingLocationRepos.findById(fishingLocationId);
        if (userOptional.isPresent() && fishingLocationOptional.isPresent()) {
            CheckIn checkIn = new CheckIn();
            checkIn.setUser(userOptional.get());
            checkIn.setFishingLocation(fishingLocationOptional.get());
            checkIn.setCheckInTime(LocalDateTime.now());
            return checkInRepos.save(checkIn);
        } else if (!userOptional.isPresent()) {
            throw new UserNotFoundException(userId);
        } else {
            throw new FishingLocationNotFoundException(fishingLocationId);
        }
    }
}
