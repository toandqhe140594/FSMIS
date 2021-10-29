package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.entity.address.Ward;
import fpt.g31.fsmis.exception.FishingLocationNotFoundException;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.ReviewRepos;
import fpt.g31.fsmis.repository.UserRepos;
import fpt.g31.fsmis.repository.WardRepos;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
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
    private ReviewRepos reviewRepos;
    private ModelMapper modelMapper;
    private final JwtFilter jwtFilter;

    public List<FishingLocation> findAllFishingLocations() {
        return fishingLocationRepos.findAll();
    }

    public String createFishingLocation(FishingLocationDtoIn fishingLocationDtoIn) {
        User owner = userRepos.findById(fishingLocationDtoIn.getOwnerId())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu!"));
        Ward ward = wardRepos.findById(fishingLocationDtoIn.getWardId())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy phường/xã!"));
        FishingLocation fishingLocation = modelMapper.map(fishingLocationDtoIn, FishingLocation.class);
        fishingLocation.setCreatedDate(LocalDateTime.now());
        fishingLocation.setLastEditedDate(LocalDateTime.now());
        fishingLocation.setOwner(owner);
        fishingLocation.setWard(ward);
        fishingLocation.setActive(true);
        fishingLocation.setVerify(false);
        fishingLocationRepos.save(fishingLocation);
        return "Tạo hồ câu thành công!";
    }

    public ResponseTextDtoOut disableFishingLocation(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        Optional<FishingLocation> findFishingLocation = fishingLocationRepos.findById(locationId);
        if (!findFishingLocation.isPresent()) {
            throw new FishingLocationNotFoundException(locationId);
        }
        FishingLocation location = findFishingLocation.get();
        if(!location.getEmployeeList().isEmpty()) {
            throw new ValidationException("Vẫn còn nhân viên đang làm việc trong khu vực của bạn.");
        }
        if (location.getOwner() != user) {
            throw new UnauthorizedException("Bạn không có quyền đóng cửa địa điểm.");
        }
        location.setActive(false);
        return new ResponseTextDtoOut("Bạn đã đóng cửa địa điểm.");
    }

    public FishingLocationOverviewDtoOut getFishingLocationOverviewById(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        Optional<FishingLocation> findFishingLocation = fishingLocationRepos.findById(locationId);
        if (!findFishingLocation.isPresent()) {
            throw new FishingLocationNotFoundException(locationId);
        }
        FishingLocation location = findFishingLocation.get();
        FishingLocationOverviewDtoOut dtoOut = modelMapper.map(location, FishingLocationOverviewDtoOut.class);
        dtoOut.setLastEditedDate(ServiceUtils.convertDateToString(location.getLastEditedDate()));
        dtoOut.setAddressFromWard(ServiceUtils.getAddressByWard(location.getWard()));
        dtoOut.setImage(ServiceUtils.splitString(location.getImageUrl()));
        dtoOut.setSaved(false);
        for(FishingLocation fishinglocation : user.getSavedFishingLocations()) {
            if(fishinglocation == location) {
                dtoOut.setSaved(true);
            }
        }
        return dtoOut;
    }

    public List<LocationPinDtoOut> getNearBy(Float longitude, Float latitude, Integer distance, Long methodId, Integer minRating) {
        List<FishingLocation> fishingLocationList = fishingLocationRepos.getNearByLocation(longitude, latitude, distance, methodId, minRating);
        List<LocationPinDtoOut> locationPinDtoOutList = new ArrayList<>();
        for (FishingLocation fishingLocation : fishingLocationList) {
            locationPinDtoOutList.add(modelMapper.map(fishingLocation, LocationPinDtoOut.class));
        }
        return locationPinDtoOutList;
    }

    public SaveStatusDtoOut saveFishingLocation(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation itemToSave = fishingLocationRepos.getById(locationId);
        List<FishingLocation> saved = user.getSavedFishingLocations();
        for(FishingLocation fishingLocation : saved) {
            if(fishingLocation == itemToSave) {
                saved.remove(fishingLocation);
                user.setSavedFishingLocations(saved);
                userRepos.save(user);
                return new SaveStatusDtoOut(false);
            }
        }
        saved.add(itemToSave);
        user.setSavedFishingLocations(saved);
        userRepos.save(user);
        return new SaveStatusDtoOut(true);
    }

    public PaginationDtoOut getSavedFishingLocationList(HttpServletRequest request, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        User user = jwtFilter.getUserFromToken(request);

        // CUSTOM PAGINATION
        List<FishingLocation> saved = user.getSavedFishingLocations();
        PageRequest pageRequest = PageRequest.of(pageNo - 1, 10);
        int total = saved.size();
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), total);
        if(start > end) {
            start = end = 0;
        }
        Page<FishingLocation> savedFishingLocations = new PageImpl<>(saved.subList(start, end), pageRequest, total);

        List<FishingLocationItemDtoOut> output = new ArrayList<>();
        for (FishingLocation fishingLocation : savedFishingLocations) {
            FishingLocationItemDtoOut item = FishingLocationItemDtoOut.builder()
                    .id(fishingLocation.getId())
                    .name(fishingLocation.getName())
                    .image(ServiceUtils.splitString(fishingLocation.getImageUrl()).get(0))
                    .verify(fishingLocation.getVerify())
                    .address(ServiceUtils.getAddress(fishingLocation.getAddress(), fishingLocation.getWard()))
                    .build();
            Double score = reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(fishingLocation.getId());
            if (score == null) {
                score = 0.0;
            }
            item.setScore(score);
            output.add(item);
        }

        return PaginationDtoOut.builder()
                .totalPage(savedFishingLocations.getTotalPages())
                .pageNo(pageNo)
                .items(output)
                .build();
    }

    public List<FishingLocationItemDtoOut> getOwnedFishingLocation(HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        List<FishingLocation> fishingLocationList = fishingLocationRepos.findByOwnerIdAndActiveIsTrue(user.getId());
        List<FishingLocationItemDtoOut> fishingLocationItemDtoOutList = new ArrayList<>();
        for (FishingLocation fishingLocation: fishingLocationList) {
            FishingLocationItemDtoOut fishingLocationItemDtoOut = FishingLocationItemDtoOut.builder()
                    .id(fishingLocation.getId())
                    .name(fishingLocation.getName())
                    .image(ServiceUtils.splitString(fishingLocation.getImageUrl()).get(0))
                    .verify(fishingLocation.getVerify())
                    .address(ServiceUtils.getAddress(fishingLocation.getAddress(), fishingLocation.getWard()))
                    .score(reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(fishingLocation.getId()))
                    .build();
            fishingLocationItemDtoOutList.add(fishingLocationItemDtoOut);
        }
        return fishingLocationItemDtoOutList;
    }
}
