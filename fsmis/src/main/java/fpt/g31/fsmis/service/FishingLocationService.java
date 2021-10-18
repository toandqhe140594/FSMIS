package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.dto.output.FishingLocationDtoOut;
import fpt.g31.fsmis.dto.output.LocationPinDtoOut;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.FishingLocationNotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import fpt.g31.fsmis.exception.UserNotFoundException;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.UserRepos;
import fpt.g31.fsmis.repository.WardRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FishingLocationService {
    private FishingLocationRepos fishingLocationRepos;
    private UserRepos userRepos;
    private WardRepos wardRepos;

    private ModelMapper modelMapper;

    public List<FishingLocation> findAllFishingLocations() {
        return fishingLocationRepos.findAll();
    }

    public String createFishingLocation(FishingLocationDtoIn fishingLocationDtoIn) {
        if (fishingLocationDtoIn != null) {
            FishingLocation fishingLocation;
            Long ownerId = fishingLocationDtoIn.getOwnerId();
            Optional<User> ownerOptional = userRepos.findById(ownerId);
            if (!ownerOptional.isPresent()) {
                throw new UserNotFoundException(ownerId);
            }
            fishingLocation = modelMapper.map(fishingLocationDtoIn, FishingLocation.class);
            fishingLocation.setCreatedDate(LocalDateTime.now());
            fishingLocation.setLastEditedDate(LocalDateTime.now());
            fishingLocation.setOwner(ownerOptional.get());
            fishingLocation.setActive(true);
            fishingLocationRepos.save(fishingLocation);
            return "Tạo hồ câu thành công!";
        } else {
            throw new ValidationException("Thiếu request body");
        }
    }

    public Boolean disableFishingLocation(Long locationId, Long ownerId) {
        Optional<FishingLocation> findFishingLocation = fishingLocationRepos.findById(locationId);
        if (!findFishingLocation.isPresent()) {
            throw new FishingLocationNotFoundException(locationId);
        }
        FishingLocation location = findFishingLocation.get();
        if (!location.getOwner().getId().equals(ownerId)) {
            throw new UnauthorizedException("Không phải chủ hồ, không có quyền xóa hồ");
        }
        location.setActive(false);
        return true;
    }

    public FishingLocationDtoOut getById(Long locationId) {
        Optional<FishingLocation> findFishingLocation = fishingLocationRepos.findById(locationId);
        if (!findFishingLocation.isPresent()) {
            throw new FishingLocationNotFoundException(locationId);
        }
        FishingLocation location = findFishingLocation.get();
        FishingLocationDtoOut dtoOut = modelMapper.map(location, FishingLocationDtoOut.class);
        dtoOut.setAddressFromWard(ServiceUtils.getAddressByWard(location.getWard()));
        return dtoOut;
    }

    public List<LocationPinDtoOut> getNearBy(Float longitude, Float latitude, Integer distance, Long methodId, Integer minRating) {
        List<FishingLocation> fishingLocationList = fishingLocationRepos.getNearByLocation(longitude, latitude, distance, methodId, minRating);
        List<LocationPinDtoOut> locationPinDtoOutList = new ArrayList<>();
        for (FishingLocation fishingLocation: fishingLocationList) {
            locationPinDtoOutList.add(modelMapper.map(fishingLocation, LocationPinDtoOut.class));
        }
        return locationPinDtoOutList;
    }
}
