package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.FishingLocationDtoInput;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.UserNotFoundException;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FishingLocationService {
    private FishingLocationRepos fishingLocationRepos;
    private UserRepos userRepos;

    private ModelMapper modelMapper;

    public List<FishingLocation> findAllFishingSpots() {
        return fishingLocationRepos.findAll();
    }

    public FishingLocation createFishingLocation(FishingLocationDtoInput fishingLocationDtoInput) {
        if (fishingLocationDtoInput != null) {
            FishingLocation fishingLocation;
            Long ownerId = fishingLocationDtoInput.getOwnerId();
            Optional<User> ownerOptional = userRepos.findById(ownerId);
            if (!ownerOptional.isPresent()) {
                throw new UserNotFoundException(ownerId);
            }
            fishingLocation = modelMapper.map(fishingLocationDtoInput, FishingLocation.class);
            fishingLocation.setCreatedDate(LocalDateTime.now());
            fishingLocation.setLastEditedDate(LocalDateTime.now());
            fishingLocation.setOwner(ownerOptional.get());
            return fishingLocationRepos.save(fishingLocation);
        } else {
            throw new ValidationException("Thiếu request body");
        }
    }

    public FishingLocation findById(Long id) {
        Optional<FishingLocation> findFishingSpot = fishingLocationRepos.findById(id);
        if (!findFishingSpot.isPresent()) {
            throw new ValidationException("Hồ câu không tồn tại");
        }
        return findFishingSpot.get();
    }

    public Boolean disableFishingLocation(Long fishingLocationId, Long ownerId) {
        FishingLocation fishingLocation = findById(fishingLocationId);
        if (fishingLocation.getOwner().getId().equals(ownerId)) {
            throw new ValidationException("Không có quyền xóa hồ");
        }
        fishingLocation.setActive(false);
        return true;
    }

//    public FishingLocation updateFishingSpot(Long id, FishingLocationDtoInput fishingLocationDtoInput) {
//        return null;
//    }
}
