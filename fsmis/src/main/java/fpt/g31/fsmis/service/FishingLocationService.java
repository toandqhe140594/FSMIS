package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.entity.address.Ward;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import fpt.g31.fsmis.repository.*;
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
    private static final String UNAUTHORIZED = "Không có quyền truy cập thông tin;";
    private static final String LOCATION_NOT_FOUND = "Không tìm thấy hồ câu!";
    private static final String ACCOUNT_NOT_FOUND = "Không tìm thấy tài khoản!";

    private final JwtFilter jwtFilter;
    private final CheckInRepos checkInRepos;
    private FishingLocationRepos fishingLocationRepos;
    private UserRepos userRepos;
    private WardRepos wardRepos;
    private ReviewRepos reviewRepos;
    private ModelMapper modelMapper;

    public List<FishingLocation> findAllFishingLocations() {
        return fishingLocationRepos.findAll();
    }

    public ResponseTextDtoOut createFishingLocation(FishingLocationDtoIn fishingLocationDtoIn,
                                                    HttpServletRequest request) {
        User owner = jwtFilter.getUserFromToken(request);
        Ward ward = wardRepos.findById(fishingLocationDtoIn.getWardId())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy phường/xã!"));
        FishingLocation fishingLocation = FishingLocation.builder()
                .name(fishingLocationDtoIn.getName())
                .longitude(fishingLocationDtoIn.getLongitude())
                .latitude(fishingLocationDtoIn.getLatitude())
                .address(fishingLocationDtoIn.getAddress())
                .ward(ward)
                .phone(fishingLocationDtoIn.getPhone())
                .description(fishingLocationDtoIn.getDescription())
                .website(fishingLocationDtoIn.getWebsite())
                .service(fishingLocationDtoIn.getService())
                .timetable(fishingLocationDtoIn.getTimetable())
                .rule(fishingLocationDtoIn.getRule())
                .imageUrl(ServiceUtils.mergeString(fishingLocationDtoIn.getImages()))
                .createdDate(LocalDateTime.now())
                .lastEditedDate(LocalDateTime.now())
                .active(true)
                .verify(false)
                .owner(owner)
                .build();
        fishingLocationRepos.save(fishingLocation);
        return new ResponseTextDtoOut("Tạo hồ câu thành công!");
    }

    public ResponseTextDtoOut editFishingLocation(FishingLocationDtoIn fishingLocationDtoIn, HttpServletRequest request, Long locationId) {
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new ValidationException(LOCATION_NOT_FOUND));
        User user = jwtFilter.getUserFromToken(request);
        if (!location.getOwner().equals(user)) {
            throw new ValidationException("Không có quyền chỉnh sửa hồ");
        }
        Ward ward = wardRepos.findById(fishingLocationDtoIn.getWardId())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy phường/xã!"));
        location.setName(fishingLocationDtoIn.getName());
        location.setPhone(fishingLocationDtoIn.getPhone());
        location.setWebsite(fishingLocationDtoIn.getWebsite());
        location.setAddress(fishingLocationDtoIn.getAddress());
        location.setWard(ward);
        location.setLongitude(fishingLocationDtoIn.getLongitude());
        location.setLatitude(fishingLocationDtoIn.getLatitude());
        location.setDescription(location.getDescription());
        location.setTimetable(fishingLocationDtoIn.getTimetable());
        location.setService(fishingLocationDtoIn.getService());
        location.setRule(fishingLocationDtoIn.getRule());
        location.setImageUrl(ServiceUtils.mergeString(fishingLocationDtoIn.getImages()));
        location.setLastEditedDate(LocalDateTime.now());
        location.setVerify(false);
        fishingLocationRepos.save(location);
        return new ResponseTextDtoOut("Chỉnh sửa thông tin hồ câu thành công!");
    }

    public ResponseTextDtoOut disableFishingLocation(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new ValidationException(LOCATION_NOT_FOUND));
        if (!location.getEmployeeList().isEmpty()) {
            throw new ValidationException("Vẫn còn nhân viên đang làm việc trong khu vực của bạn.");
        }
        if (location.getOwner() != user) {
            throw new UnauthorizedException("Bạn không có quyền đóng cửa địa điểm.");
        }
        location.setActive(false);
        fishingLocationRepos.save(location);
        return new ResponseTextDtoOut("Bạn đã đóng cửa địa điểm.");
    }

    public FishingLocationOverviewDtoOut getFishingLocationOverviewById(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khu hồ!"));
        FishingLocationOverviewDtoOut dtoOut = modelMapper.map(location, FishingLocationOverviewDtoOut.class);
        dtoOut.setLastEditedDate(ServiceUtils.convertDateToString(location.getLastEditedDate()));
        dtoOut.setAddressFromWard(ServiceUtils.getAddressByWard(location.getWard()));
        dtoOut.setImage(ServiceUtils.splitString(location.getImageUrl()));
        dtoOut.setSaved(false);
        for (FishingLocation fishinglocation : user.getSavedFishingLocations()) {
            if (fishinglocation == location) {
                dtoOut.setSaved(true);
            }
        }
        if (location.getOwner().equals(user)) {
            dtoOut.setRole("OWNER");
        } else if (location.getEmployeeList().contains(user)) {
            dtoOut.setRole("STAFF");
        } else {
            dtoOut.setRole("ANGLER");
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
        for (FishingLocation fishingLocation : saved) {
            if (fishingLocation == itemToSave) {
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
        if (start > end) {
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
        List<FishingLocationItemDtoOut> fishingLocationItemDtoOutList = new ArrayList<>();
        List<FishingLocation> fishingLocationList = fishingLocationRepos.findByOwnerIdAndActiveIsTrue(user.getId());
        String role;
        if (fishingLocationList.isEmpty()) {
            Optional<FishingLocation> location = fishingLocationRepos.findByEmployeeId(user.getId());
            location.ifPresent(fishingLocationList::add);
            role = "STAFF";
        } else {
            role = "OWNER";
        }
        for (FishingLocation fishingLocation : fishingLocationList) {
            FishingLocationItemDtoOut fishingLocationItemDtoOut = FishingLocationItemDtoOut.builder()
                    .id(fishingLocation.getId())
                    .name(fishingLocation.getName())
                    .image(ServiceUtils.splitString(fishingLocation.getImageUrl()).get(0))
                    .verify(fishingLocation.getVerify())
                    .address(ServiceUtils.getAddress(fishingLocation.getAddress(), fishingLocation.getWard()))
                    .score(reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(fishingLocation.getId()))
                    .role(role)
                    .build();
            fishingLocationItemDtoOutList.add(fishingLocationItemDtoOut);
        }
        return fishingLocationItemDtoOutList;
    }

    public List<StaffDtoOut> getStaff(Long locationId, HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new ValidationException(LOCATION_NOT_FOUND));
        if (location.getOwner() != user) {
            throw new UnauthorizedException(UNAUTHORIZED);
        }
        List<StaffDtoOut> staffDtoOuts = new ArrayList<>();
        for (User staff :
                location.getEmployeeList()) {
            staffDtoOuts.add(StaffDtoOut.builder()
                    .id(staff.getId())
                    .name(staff.getFullName())
                    .avatar(staff.getAvatarUrl())
                    .phone(staff.getPhone())
                    .build());
        }
        return staffDtoOuts;
    }

    public StaffDtoOut addStaff(Long locationId, Long userId, HttpServletRequest request) {
        User owner = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new ValidationException(LOCATION_NOT_FOUND));
        if (location.getOwner() != owner) {
            throw new UnauthorizedException(UNAUTHORIZED);
        }
        if (userRepos.getAllStaffId().contains(userId) || userRepos.getAllOwnerId().contains(userId)) {
            throw new ValidationException("Không thể thêm tài khoản này làm nhân viên!");
        }
        User staff = userRepos.findById(userId)
                .orElseThrow(() -> new ValidationException(ACCOUNT_NOT_FOUND));

        List<User> staffList = location.getEmployeeList();
        staffList.add(staff);
        location.setEmployeeList(staffList);
        fishingLocationRepos.save(location);
        return StaffDtoOut.builder()
                .id(staff.getId())
                .name(staff.getFullName())
                .phone(staff.getPhone())
                .avatar(staff.getAvatarUrl())
                .build();
    }

    public StaffDtoOut deleteStaff(Long locationId, Long staffId, HttpServletRequest request) {
        User owner = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new ValidationException(LOCATION_NOT_FOUND));
        if (location.getOwner() != owner) {
            throw new UnauthorizedException(UNAUTHORIZED);
        }
        User staff = userRepos.findById(staffId)
                .orElseThrow(() -> new ValidationException(ACCOUNT_NOT_FOUND));
        List<User> staffList = location.getEmployeeList();
        staffList.remove(staff);
        location.setEmployeeList(staffList);
        fishingLocationRepos.save(location);
        return StaffDtoOut.builder()
                .id(staff.getId())
                .name(staff.getFullName())
                .phone(staff.getPhone())
                .avatar(staff.getAvatarUrl())
                .build();
    }

    public UserDtoOut getStaffDetail(Long locationId, Long staffId, HttpServletRequest request) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khu hồ!"));
        User staff = userRepos.findById(staffId)
                .orElseThrow(() -> new NotFoundException(ACCOUNT_NOT_FOUND));
        if (!location.getOwner().equals(user)) {
            throw new ValidationException("Không phải chủ hồ, không có quyền truy cập!");
        }
        if (!location.getEmployeeList().contains(staff)) {
            throw new ValidationException("Tài khoản được tìm kiếm không phải nhân viên, không có quyền truy cập!");
        }
        return UserDtoOut.builder()
                .id(staff.getId())
                .avatar(staff.getAvatarUrl())
                .active(staff.isActive())
                .fullName(staff.getFullName())
                .dob(ServiceUtils.convertDateToString(staff.getDob()))
                .phone(staff.getPhone())
                .gender(staff.isGender())
                .address(ServiceUtils.getAddress(staff.getAddress(), staff.getWard()))
                .build();
    }
}
