package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingSpot;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.repository.CheckInRepos;
import fpt.g31.fsmis.repository.FishingSpotRepos;
import fpt.g31.fsmis.repository.UserRepos;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;

@Component
public class CheckInService {
    private final CheckInRepos checkInRepos;
    private final UserRepos userRepos;
    private final FishingSpotRepos fishingSpotRepos;

    public CheckInService(CheckInRepos checkInRepos, UserRepos userRepos, FishingSpotRepos fishingSpotRepos) {
        this.checkInRepos = checkInRepos;
        this.userRepos = userRepos;
        this.fishingSpotRepos = fishingSpotRepos;
    }

    public CheckIn userCheckInFishingSpot(Long userId, Long fishingSpotId) {
        Optional<User> userOptional = userRepos.findById(userId);
        Optional<FishingSpot> fishingSpotOptional = fishingSpotRepos.findById(fishingSpotId);
        if (userOptional.isPresent() && fishingSpotOptional.isPresent()) {
            CheckIn checkIn = new CheckIn();
            checkIn.setUser(userOptional.get());
            checkIn.setFishingSpot(fishingSpotOptional.get());
            checkIn.setCheckInTime(LocalDateTime.now());
            return checkInRepos.save(checkIn);
        } else {
            throw new RuntimeException("UserId/fishingSpotId doesn't exist");
        }
    }
}
