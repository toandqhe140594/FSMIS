package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.repository.CheckInRepos;
import fpt.g31.fsmis.repository.FishingSpotRepos;
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
    private final FishingSpotRepos fishingSpotRepos;

    public CheckIn userCheckInFishingSpot(Long userId, Long fishingSpotId) {
        Optional<User> userOptional = userRepos.findById(userId);
        Optional<FishingLocation> fishingSpotOptional = fishingSpotRepos.findById(fishingSpotId);
        if (userOptional.isPresent() && fishingSpotOptional.isPresent()) {
            CheckIn checkIn = new CheckIn();
            checkIn.setUser(userOptional.get());
            checkIn.setFishingLocation(fishingSpotOptional.get());
            checkIn.setCheckInTime(LocalDateTime.now());
            return checkInRepos.save(checkIn);
        } else {
            throw new RuntimeException("UserId/fishingSpotId doesn't exist");
        }
    }
}
