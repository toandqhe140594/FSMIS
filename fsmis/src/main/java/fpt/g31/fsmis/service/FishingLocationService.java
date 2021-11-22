package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.FilterDtoIn;
import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.dto.input.SuggestedLocationDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.entity.address.District;
import fpt.g31.fsmis.entity.address.Province;
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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
@AllArgsConstructor
public class FishingLocationService {
    private static final String UNAUTHORIZED = "Không có quyền truy cập thông tin;";
    private static final String LOCATION_NOT_FOUND = "Không tìm thấy hồ câu!";
    private static final String ACCOUNT_NOT_FOUND = "Không tìm thấy tài khoản!";
    private static final String INVALID_PAGE_NUMBER = "Số trang không hợp lệ";
    private final JwtFilter jwtFilter;
    private final FishingLocationRepos fishingLocationRepos;
    private final UserRepos userRepos;
    private final WardRepos wardRepos;
    private final ReviewRepos reviewRepos;
    private final ModelMapper modelMapper;
    private final SuggestedLocationRepos suggestedLocationRepos;
    private final NotificationRepos notificationRepos;

    public ResponseTextDtoOut createFishingLocation(FishingLocationDtoIn fishingLocationDtoIn,
                                                    HttpServletRequest request) {
        User owner = jwtFilter.getUserFromToken(request);
        Ward ward = wardRepos.findById(fishingLocationDtoIn.getWardId())
                .orElseThrow(() -> new NotFoundException("Không tìm thấy phường/xã!"));
        FishingLocation fishingLocation = FishingLocation.builder()
                .name(fishingLocationDtoIn.getName().trim())
                .unsignedName(VNCharacterUtils.removeAccent(fishingLocationDtoIn.getName().toLowerCase().trim()))
                .longitude(fishingLocationDtoIn.getLongitude())
                .latitude(fishingLocationDtoIn.getLatitude())
                .address(fishingLocationDtoIn.getAddress().trim())
                .ward(ward)
                .phone(fishingLocationDtoIn.getPhone().trim())
                .description(fishingLocationDtoIn.getDescription().trim())
                .website(fishingLocationDtoIn.getWebsite())
                .service(fishingLocationDtoIn.getService().trim())
                .timetable(fishingLocationDtoIn.getTimetable().trim())
                .rule(fishingLocationDtoIn.getRule().trim())
                .imageUrl(ServiceUtils.mergeString(fishingLocationDtoIn.getImages()))
                .createdDate(LocalDateTime.now())
                .lastEditedDate(LocalDateTime.now())
                .active(true)
                .verify(false)
                .closed(false)
                .score(0F)
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
        location.setName(fishingLocationDtoIn.getName().trim());
        location.setUnsignedName(VNCharacterUtils.removeAccent(fishingLocationDtoIn.getName().toLowerCase().trim()));
        location.setPhone(fishingLocationDtoIn.getPhone().trim());
        location.setWebsite(fishingLocationDtoIn.getWebsite().trim());
        location.setAddress(fishingLocationDtoIn.getAddress().trim());
        location.setWard(ward);
        location.setLongitude(fishingLocationDtoIn.getLongitude());
        location.setLatitude(fishingLocationDtoIn.getLatitude());
        location.setDescription(fishingLocationDtoIn.getDescription().trim());
        location.setTimetable(fishingLocationDtoIn.getTimetable().trim());
        location.setService(fishingLocationDtoIn.getService().trim());
        location.setRule(fishingLocationDtoIn.getRule().trim());
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
        List<User> savedUser = location.getSavedUser();
        String message = location.getName() + " đã dừng hoạt động";
        NotificationService.createNotification(notificationRepos, message, savedUser);
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

    public List<FishingLocationPinDtoOut> getNearBy(Float longitude, Float latitude, Integer distance, Long methodId, Integer minRating) {
        List<FishingLocation> fishingLocationList = fishingLocationRepos.getNearByLocation(longitude, latitude, distance, methodId, minRating);
        List<FishingLocationPinDtoOut> fishingLocationPinDtoOutList = new ArrayList<>();
        for (FishingLocation fishingLocation : fishingLocationList) {
            fishingLocationPinDtoOutList.add(modelMapper.map(fishingLocation, FishingLocationPinDtoOut.class));
        }
        return fishingLocationPinDtoOutList;
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
                    .closed(fishingLocation.getClosed())
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
                .totalItem(savedFishingLocations.getTotalElements())
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
                    .closed(fishingLocation.getClosed())
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
                .active(staff.getActive())
                .fullName(staff.getFullName())
                .dob(ServiceUtils.convertDateToString(staff.getDob()))
                .phone(staff.getPhone())
                .gender(staff.getGender())
                .address(ServiceUtils.getAddress(staff.getAddress(), staff.getWard()))
                .build();
    }

    public ResponseTextDtoOut switchLocationState(HttpServletRequest request, Long locationId) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
        if (!location.getOwner().equals(user)) {
            throw new UnauthorizedException("Không có quyền thực hiện hành động này");
        }
        location.setClosed(!location.getClosed());
        fishingLocationRepos.save(location);
        String responseText;
        String notificationText;
        if (Boolean.TRUE.equals(location.getClosed())) {
            responseText = "Đóng cửa khu hồ thành công";
            notificationText = location.getName() + " đã đóng cửa";
        } else {
            responseText = "Mở cửa khu hồ thành công";
            notificationText = location.getName() + " đã mở cửa";
        }
        NotificationService.createNotification(notificationRepos, notificationText, location.getSavedUser());
        return new ResponseTextDtoOut(responseText);
    }

    public PaginationDtoOut adminGetLocationList(Integer pageNo, String input, Boolean active, Boolean verified) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        Specification<FishingLocation> specification = where(activeIs(active))
                .and(verifiedIs(verified));
        if (input != null) {
            String[] words = input.split(" ");
            for (String word : words) {
                specification = specification.and(nameLike("%" + word + "%"));
            }
        }
        List<AdminFishingLocationItemDtoOut> output = new ArrayList<>();
        Page<FishingLocation> locationList = fishingLocationRepos.findAll(specification, PageRequest.of(pageNo - 1, 10));
        for (FishingLocation location : locationList) {
            AdminFishingLocationItemDtoOut dtoOut = AdminFishingLocationItemDtoOut.builder()
                    .id(location.getId())
                    .name(location.getName())
                    .active(location.getActive())
                    .verified(location.getVerify())
                    .address(ServiceUtils.getAddress(location.getAddress(), location.getWard()))
                    .rating(location.getScore().doubleValue())
                    .build();
            output.add(dtoOut);
        }
        return PaginationDtoOut.builder()
                .totalPage(locationList.getTotalPages())
                .totalItem(locationList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut searchFishingLocation(FilterDtoIn filterDtoIn, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<FishingLocationItemDtoOut> output = new ArrayList<>();
        Specification<FishingLocation> specification;
        if (filterDtoIn.getInput() != null && filterDtoIn.getInput().matches("^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$")) {
            specification = where(phoneIs(filterDtoIn.getInput()));
        } else {
            specification = where(fishingMethodIdIn(filterDtoIn.getFishingMethodIdList()))
                    .and(provinceIdIn(filterDtoIn.getProvinceIdList()))
                    .and(fishSpeciesIdIn(filterDtoIn.getFishSpeciesIdList()))
                    .and(scoreGreaterThan(filterDtoIn.getScore()));
            if (filterDtoIn.getInput() != null) {
                String[] words = filterDtoIn.getInput().split(" ");
                for (String word : words) {
                    specification = specification.and(nameLike("%" + word + "%"));
                }
            }
        }
        specification = specification.and(activeIs(true));
        Page<FishingLocation> fishingLocationList = fishingLocationRepos.findAll(specification, PageRequest.of(pageNo - 1, 10));
        for (FishingLocation location :
                fishingLocationList) {
            addFishingLocationItemDtoOut(output, location);
        }
        return PaginationDtoOut.builder()
                .totalItem(fishingLocationList.getTotalElements())
                .totalPage(fishingLocationList.getTotalPages())
                .items(output)
                .build();
    }

    private void addFishingLocationItemDtoOut(List<FishingLocationItemDtoOut> output, FishingLocation location) {
        Double score = reviewRepos.getAverageScoreByFishingLocationIdAndActiveIsTrue(location.getId());
        if (score == null) {
            score = 0.0;
        }
        FishingLocationItemDtoOut fishingLocationItemDtoOut = FishingLocationItemDtoOut.builder()
                .id(location.getId())
                .name(location.getName())
                .image(ServiceUtils.splitString(location.getImageUrl()).get(0))
                .verify(location.getVerify())
                .score(score)
                .address(location.getAddress())
                .closed(location.getClosed())
                .build();
        output.add(fishingLocationItemDtoOut);
    }

    private Specification<FishingLocation> fishingMethodIdIn(List<Long> fishingMethodIdList) {
        if (fishingMethodIdList == null || fishingMethodIdList.isEmpty()) {
            return null;
        }
        return (root, criteriaQuery, criteriaBuilder) -> {
            criteriaQuery.distinct(true);
            Join<FishingLocation, Lake> lakeJoin = root.join("lakeList");
            Join<Lake, FishingMethod> fishingMethodJoin = lakeJoin.join("fishingMethodSet");
            return criteriaBuilder.in(fishingMethodJoin.get("id")).value(fishingMethodIdList);
        };
    }

    private Specification<FishingLocation> provinceIdIn(List<Long> provinceIdList) {
        if (provinceIdList == null || provinceIdList.isEmpty()) {
            return null;
        }
        return (root, criteriaQuery, criteriaBuilder) -> {
            criteriaQuery.distinct(true);
            Join<FishingLocation, Ward> wardJoin = root.join("ward");
            Join<Ward, District> districtJoin = wardJoin.join("district");
            Join<District, Province> provinceJoin = districtJoin.join("province");
            return criteriaBuilder.in(provinceJoin.get("id")).value(provinceIdList);
        };
    }

    private Specification<FishingLocation> fishSpeciesIdIn(List<Long> fishSpeciesIdList) {
        if (fishSpeciesIdList == null || fishSpeciesIdList.isEmpty()) {
            return null;
        }
        return (root, criteriaQuery, criteriaBuilder) -> {
            criteriaQuery.distinct(true);
            Join<FishingLocation, Lake> lakeJoin = root.join("lakeList");
            Join<Lake, FishInLake> fishInLakeJoin = lakeJoin.join("fishInLakeList");
            Join<FishInLake, FishSpecies> fishSpeciesJoin = fishInLakeJoin.join("fishSpecies");
            return criteriaBuilder.in(fishSpeciesJoin.get("id")).value(fishSpeciesIdList);
        };
    }

    private Specification<FishingLocation> activeIs(Boolean active) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            if (active == null) return null;
            return criteriaBuilder.equal(root.get("active"), active);
        };
    }

    private Specification<FishingLocation> verifiedIs(Boolean verified) {
        return (root, criteriaQuery, criteriaBuilder) -> {
            if (verified == null) return null;
            return criteriaBuilder.equal(root.get("verify"), verified);
        };
    }


    private Specification<FishingLocation> nameLike(String input) {
        return (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("unsignedName")), VNCharacterUtils.removeAccent(input).toLowerCase());
    }

    private Specification<FishingLocation> phoneIs(String input) {
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.equal(root.get("phone"), input);
    }

    private Specification<FishingLocation> scoreGreaterThan(Integer minScore) {
        if (minScore == null || minScore < 1) return null;
        return (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.greaterThanOrEqualTo(root.get("score"), minScore);
    }

    public ResponseTextDtoOut adminChangeVerify(Long locationId) {
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
        location.setVerify(!location.getVerify());
        fishingLocationRepos.save(location);
        return new ResponseTextDtoOut(Boolean.TRUE.equals(location.getVerify()) ?
                "Xác nhận khu hồ thành công!" :
                "Bỏ xác nhận khu hồ thành công!");
    }

    public ResponseTextDtoOut adminChangeActive(Long locationId) {
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
        location.setActive(!location.getActive());
        fishingLocationRepos.save(location);
        return new ResponseTextDtoOut(Boolean.TRUE.equals(location.getActive()) ?
                "Hiện khu hồ thành công!" :
                "Ẩn khu hồ thành công!");
    }

    public ResponseTextDtoOut suggest(SuggestedLocationDtoIn suggestedLocationDtoIn, HttpServletRequest request) {
        User sender = jwtFilter.getUserFromToken(request);
        SuggestedLocation suggestedLocation = SuggestedLocation.builder()
                .name(suggestedLocationDtoIn.getName().trim())
                .phone(suggestedLocationDtoIn.getPhone().trim())
                .description(suggestedLocationDtoIn.getDescription().trim())
                .senderPhone(sender.getPhone())
                .build();
        suggestedLocationRepos.save(suggestedLocation);
        return new ResponseTextDtoOut("Gợi ý khu hồ thành công");
    }

    public List<SuggestedLocationDtoOut> adminGetSuggestedLocationList() {
        List<SuggestedLocation> suggestedLocationList = suggestedLocationRepos.findAll();
        List<SuggestedLocationDtoOut> output = new ArrayList<>();
        for (SuggestedLocation suggestedLocation : suggestedLocationList) {
            output.add(SuggestedLocationDtoOut.builder()
                    .id(suggestedLocation.getId())
                    .name(suggestedLocation.getName())
                    .phone(suggestedLocation.getPhone())
                    .description(suggestedLocation.getDescription())
                    .senderPhone(suggestedLocation.getSenderPhone())
                    .build());
        }
        return output;
    }

    public ResponseTextDtoOut adminRemoveSuggestedLocation(Long suggestedLocationId) {
        SuggestedLocation suggestedLocation = suggestedLocationRepos.findById(suggestedLocationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi"));
        suggestedLocationRepos.delete(suggestedLocation);
        return new ResponseTextDtoOut("Xóa gợi ý khu hồ thành công");
    }
}
