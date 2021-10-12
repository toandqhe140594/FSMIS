package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.FishingSpotDtoInput;
import fpt.g31.fsmis.entity.FishingSpot;
import fpt.g31.fsmis.repository.FishingSpotRepos;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Optional;

@Service
public class FishingSpotService {
    final FishingSpotRepos fishingSpotRepos;

    public FishingSpotService(FishingSpotRepos fishingSpotRepos) {
        this.fishingSpotRepos = fishingSpotRepos;
    }

    public List<FishingSpot> findAllFishingSpots() {
        return fishingSpotRepos.findAll();
    }

    public FishingSpot createFishingSpot(FishingSpot fishingSpot) {
        return fishingSpotRepos.save(fishingSpot);
    }

    public FishingSpot findById(Long id) {
        Optional<FishingSpot> findFishingSpot = fishingSpotRepos.findById(id);
        if (!findFishingSpot.isPresent()) {
            throw new ValidationException("Hồ câu không tồn tại");
        }
        return findFishingSpot.get();
    }

    public FishingSpot updateFishingSpot(Long id, FishingSpotDtoInput fishingSpotDtoInput) {
        return null;
    }
}
