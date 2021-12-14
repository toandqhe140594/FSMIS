package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.CatchDetailDtoIn;
import fpt.g31.fsmis.dto.input.CatchReportDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.exception.UnauthorizedException;
import fpt.g31.fsmis.repository.*;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CatchesService {

    private static final String UNAUTHORIZED = "Không có quyền truy cập";
    private static final String INVALID_PAGE_NUMBER = "SỐ trang không hợp lệ";
    private static final String LOCATION_NOT_FOUND = "Không tìm thấy điểm câu";
    private final FishingLocationRepos fishingLocationRepos;
    private final CatchesRepos catchesRepos;
    private final LakeRepos lakeRepos;
    private final FishSpeciesRepos fishSpeciesRepos;
    private final FishInLakeRepos fishInLakeRepos;
    private final JwtFilter jwtFilter;
    private final NotificationRepos notificationRepos;
    private final UserRepos userRepos;

    public PaginationDtoOut getLocationPublicCatchesList(Long locationId, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        Page<Catches> catchesList = catchesRepos.findByFishingLocationIdAndHiddenIsFalseAndApprovedIsTrueOrderByTimeDesc(locationId, PageRequest.of(pageNo - 1, 10));
        List<CatchesOverviewDtoOut> output = new ArrayList<>();
        for (Catches catches : catchesList) {
            CatchesOverviewDtoOut item = CatchesOverviewDtoOut.builder()
                    .userId(catches.getUser().getId())
                    .userFullName(catches.getUser().getFullName())
                    .avatar(catches.getUser().getAvatarUrl())
                    .locationId(catches.getFishingLocation().getId())
                    .locationName(catches.getFishingLocation().getName())
                    .id(catches.getId())
                    .description(catches.getDescription())
                    .time(ServiceUtils.convertDateToString(catches.getTime()))
                    .images(ServiceUtils.splitString(catches.getImageUrl()))
                    .build();
            List<String> fishes = new ArrayList<>();
            for (CatchesDetail catchesDetail : catches.getCatchesDetailList()) {
                fishes.add(catchesDetail.getFishSpecies().getName());
            }
            item.setFishes(fishes);
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(catchesList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(catchesList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut getLocationCatchesHistory(HttpServletRequest request, Long locationId, int pageNo,
                                                      String beginDateString, String endDateString) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        if (Boolean.FALSE.equals(isOwnerOrStaff(locationId, jwtFilter.getUserFromToken(request)))) {
            throw new ValidationException(UNAUTHORIZED);
        }
        LocalDateTime beginDate = beginDateString == null ?
                LocalDateTime.of(1970, 1, 1, 0, 0)
                : ServiceUtils.convertStringToDate(beginDateString);
        LocalDateTime endDate = endDateString == null ?
                LocalDateTime.now()
                : ServiceUtils.convertStringToDate(endDateString).plusDays(1);
        Page<Catches> catchesList = catchesRepos.findByFishingLocationIdAndTimeBetweenAndApprovedIsTrueOrderByTimeDesc
                (locationId, beginDate, endDate, PageRequest.of(pageNo - 1, 10));
        List<CatchesOverviewNoImageDtoOut> output = new ArrayList<>();
        for (Catches catches : catchesList) {
            CatchesOverviewNoImageDtoOut item = CatchesOverviewNoImageDtoOut.builder()
                    .userId(catches.getUser().getId())
                    .userFullName(catches.getUser().getFullName())
                    .avatar(catches.getUser().getAvatarUrl())
                    .locationId(catches.getFishingLocation().getId())
                    .locationName(catches.getFishingLocation().getName())
                    .id(catches.getId())
                    .description(catches.getDescription())
                    .time(ServiceUtils.convertDateToString(catches.getTime()))
                    .approverName(userRepos.getById(catches.getApproverId()).getFullName())
                    .approved(catches.getApproved())
                    .build();
            List<String> fishes = new ArrayList<>();
            for (CatchesDetail catchesDetail : catches.getCatchesDetailList()) {
                fishes.add(catchesDetail.getFishSpecies().getName());
            }
            item.setFishes(fishes);
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(catchesList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(catchesList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut getPendingCatchReports(HttpServletRequest request, Long locationId, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        if (Boolean.FALSE.equals(isOwnerOrStaff(locationId, jwtFilter.getUserFromToken(request)))) {
            throw new ValidationException(UNAUTHORIZED);
        }
        Page<Catches> catchesList = catchesRepos.findByFishingLocationIdAndApprovedIsNullOrderByTimeDesc(locationId, PageRequest.of(pageNo - 1, 10));
        List<PendingCatchReportItemDtoOut> output = new ArrayList<>();
        for (Catches catches : catchesList) {
            List<String> fishList = new ArrayList<>();
            for (CatchesDetail catchesDetail : catches.getCatchesDetailList()) {
                fishList.add(catchesDetail.getFishSpecies().getName());
            }
            PendingCatchReportItemDtoOut dtoOut = PendingCatchReportItemDtoOut.builder()
                    .id(catches.getId())
                    .name(catches.getUser().getFullName())
                    .avatar(catches.getUser().getAvatarUrl())
                    .postTime(ServiceUtils.convertDateToString(catches.getTime()))
                    .description(catches.getDescription())
                    .fishList(fishList)
                    .build();
            output.add(dtoOut);
        }
        return PaginationDtoOut.builder()
                .totalPage(catchesList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(catchesList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut getPersonalCatchesList(HttpServletRequest request, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        User user = jwtFilter.getUserFromToken(request);
        Page<Catches> catchesList = catchesRepos.findByUserIdOrderByTimeDesc(user.getId(), PageRequest.of(pageNo - 1, 10));
        List<CatchesOverviewNoImageDtoOut> output = new ArrayList<>();
        for (Catches catches : catchesList) {
            CatchesOverviewNoImageDtoOut item = CatchesOverviewNoImageDtoOut.builder()
                    .userId(user.getId())
                    .userFullName(user.getFullName())
                    .avatar(user.getAvatarUrl())
                    .locationId(catches.getFishingLocation().getId())
                    .locationName(catches.getFishingLocation().getName())
                    .id(catches.getId())
                    .approved(catches.getApproved())
                    .description(catches.getDescription())
                    .time(ServiceUtils.convertDateToString(catches.getTime()))
                    .build();
            List<String> fishes = new ArrayList<>();
            for (CatchesDetail catchesDetail : catches.getCatchesDetailList()) {
                fishes.add(catchesDetail.getFishSpecies().getName());
            }
            item.setFishes(fishes);
            output.add(item);
        }
        return PaginationDtoOut.builder()
                .totalPage(catchesList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(catchesList.getTotalElements())
                .items(output)
                .build();
    }

    public Object getCatchDetail(HttpServletRequest request, Long catchesId) {
        User user = jwtFilter.getUserFromToken(request);
        Catches catches = catchesRepos.findById(catchesId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi này!"));
//        if catch is hidden and user is not owner of that catch or staff in the location where the catch happened, throw an unauthorized exception
        if (Boolean.TRUE.equals(catches.getHidden())
                && catches.getUser() != user
                && Boolean.TRUE.equals(!isOwnerOrStaff(catches.getFishingLocation().getId(), user))) {
            throw new UnauthorizedException(UNAUTHORIZED);
        }
        List<CatchesDetail> catchesDetailList = catches.getCatchesDetailList();
        List<CaughtFishDtoOut> fishes = new ArrayList<>();
        for (CatchesDetail catchesDetail : catchesDetailList) {
            CaughtFishDtoOut item = CaughtFishDtoOut.builder()
                    .name(catchesDetail.getFishSpecies().getName())
                    .image(catchesDetail.getFishSpecies().getImageUrl())
                    .quantity(catchesDetail.getQuantity())
                    .weight(BigDecimal.valueOf(catchesDetail.getWeight()).setScale(1, RoundingMode.HALF_UP).floatValue())
                    .returnToOwner(catchesDetail.getReturnToOwner())
                    .build();
            fishes.add(item);
        }

        return CatchesDetailDtoOut.builder()
                .id(catches.getId())
                .userId(catches.getUser().getId())
                .userFullName(catches.getUser().getFullName())
                .avatar(catches.getUser().getAvatarUrl())
                .locationId(catches.getFishingLocation().getId())
                .locationName(catches.getFishingLocation().getName())
                .lakeName(lakeRepos.getById(catches.getLakeId()).getName())
                .description(catches.getDescription())
                .images(ServiceUtils.splitString(catches.getImageUrl()))
                .time(ServiceUtils.convertDateToString(catches.getTime()))
                .fishes(fishes)
                .approved(catches.getApproved())
                .build();
    }

    private Boolean isOwnerOrStaff(Long locationId, User user) {
        FishingLocation fishingLocation = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
        if (fishingLocation.getOwner() == user) {
            return true;
        }
        for (User staff : fishingLocation.getEmployeeList()) {
            if (staff == user) {
                return true;
            }
        }
        return false;
    }

    public ResponseTextDtoOut catchReport(HttpServletRequest request, CatchReportDtoIn catchReportDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        Lake lake = lakeRepos.findById(catchReportDtoIn.getLakeId())
                .orElseThrow(() -> new NotFoundException("Hồ câu không tồn tại"));
        FishingLocation fishingLocation = lake.getFishingLocation();
        List<CatchesDetail> catchesDetailList = new ArrayList<>();
        for (CatchDetailDtoIn catchDetailDtoIn :
                catchReportDtoIn.getCatchesDetailList()) {
            FishSpecies fishSpecies = fishSpeciesRepos.findById(catchDetailDtoIn.getFishSpeciesId())
                    .orElseThrow(() -> new NotFoundException("Loài cá không tồn tại"));
            CatchesDetail catchesDetail = CatchesDetail.builder()
                    .quantity(catchDetailDtoIn.getQuantity())
                    .weight(catchDetailDtoIn.getWeight())
                    .fishSpecies(fishSpecies)
                    .fishInLakeId(catchDetailDtoIn.getFishInLakeId())
                    .returnToOwner(catchDetailDtoIn.getReturnToOwner())
                    .build();
            catchesDetailList.add(catchesDetail);
        }
        Catches catches = Catches.builder()
                .description(catchReportDtoIn.getDescription())
                .imageUrl(ServiceUtils.mergeString(catchReportDtoIn.getImages()))
                .time(LocalDateTime.now())
                .hidden(catchReportDtoIn.getHidden())
                .approved(null)
                .user(user)
                .fishingLocation(fishingLocation)
                .lakeId(lake.getId())
                .catchesDetailList(catchesDetailList)
                .build();
        catchesRepos.save(catches);
        return new ResponseTextDtoOut("Báo cá thành công, vui lòng chờ hồ câu duyệt!");
    }

    public ResponseTextDtoOut approveCatch(HttpServletRequest request, Long catchesId, Boolean isApprove) {
        User user = jwtFilter.getUserFromToken(request);
        Catches catches = catchesRepos.findById(catchesId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi"));
        if (!catches.getFishingLocation().getOwner().equals(user)
                && !catches.getFishingLocation().getEmployeeList().contains(user)) {
            throw new ValidationException(UNAUTHORIZED);
        }
        if (Boolean.TRUE.equals(isApprove)) {
            Lake lake = lakeRepos.getById(catches.getLakeId());
            List<FishInLake> fishInLakeList = lake.getFishInLakeList();
            for (CatchesDetail catchesDetail : catches.getCatchesDetailList()) {
                if (Boolean.TRUE.equals(catchesDetail.getReturnToOwner())) {
                    continue;
                }
                FishInLake fishInLake = fishInLakeRepos.findById(catchesDetail.getFishInLakeId())
                        .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi"));
                if (fishInLakeList.contains(fishInLake)) {
                    fishInLake.setQuantity(fishInLake.getQuantity() - catchesDetail.getQuantity());
                    fishInLake.setTotalWeight(fishInLake.getTotalWeight() - catchesDetail.getWeight());
                }
                fishInLakeRepos.save(fishInLake);
            }
        }
        catches.setApproved(isApprove);
        catches.setApproverId(user.getId());
        catchesRepos.save(catches);
        String notificationText = "Báo cá của bạn tại " + catches.getFishingLocation().getName() + " đã " + (Boolean.TRUE.equals(catches.getApproved()) ? "được duyệt" : "bị từ chối");
        List<User> notificationReceiver = new ArrayList<>();
        notificationReceiver.add(catches.getUser());
        NotificationService.createNotification(notificationRepos, notificationText, notificationReceiver);
        return new ResponseTextDtoOut("Phê duyệt thành công");
    }

    public ResponseTextDtoOut adminDeleteCatch(Long catchId) {
        Catches catches = catchesRepos.findById(catchId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy báo cá"));
        catches.setApproved(false);
        catchesRepos.save(catches);
        return new ResponseTextDtoOut("Xóa báo cá thành công");
    }
}
