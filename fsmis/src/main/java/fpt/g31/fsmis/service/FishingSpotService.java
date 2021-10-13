package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.FishingSpotDtoInput;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.repository.FishingSpotRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FishingSpotService {
    final FishingSpotRepos fishingSpotRepos;

    public List<FishingLocation> findAllFishingSpots() {
        return fishingSpotRepos.findAll();
    }

    public FishingLocation createFishingSpot(FishingLocation fishingLocation) {
        return fishingSpotRepos.save(fishingLocation);
    }

    public FishingLocation findById(Long id) {
        Optional<FishingLocation> findFishingSpot = fishingSpotRepos.findById(id);
        if (!findFishingSpot.isPresent()) {
            throw new ValidationException("Hồ câu không tồn tại");
        }
        return findFishingSpot.get();
    }

    public FishingLocation updateFishingSpot(Long id, FishingSpotDtoInput fishingSpotDtoInput) {
        return null;
    }
}
