package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.CatchDetailDtoIn;
import fpt.g31.fsmis.dto.input.CatchReportDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.CatchesRepos;
import fpt.g31.fsmis.repository.FishSpeciesRepos;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.LakeRepos;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class CatchesService {

    private final FishingLocationRepos fishingLocationRepos;
    private final CatchesRepos catchesRepos;
    private final LakeRepos lakeRepos;
    private final FishSpeciesRepos fishSpeciesRepos;
    private final JwtFilter jwtFilter;

    public PaginationDtoOut getPostedCatchesListByLocationId(Long locationId, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
        }
        Page<Catches> catchesList = catchesRepos.findByFishingLocationIdAndHiddenIsFalseOrderByTimeDesc(locationId, PageRequest.of(pageNo - 1, 10));
        List<CatchesOverviewHasImageDtoOut> output = new ArrayList<>();
        for (Catches catches : catchesList) {
            CatchesOverviewHasImageDtoOut item = CatchesOverviewHasImageDtoOut.builder()
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
                .items(output)
                .build();
    }

    // TODO: chưa có filter
    public PaginationDtoOut getPublicCatchesListByLocationId(HttpServletRequest request, Long locationId, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Số trang không hợp lệ");
        }
        if (!isOwnerOrStaff(locationId, jwtFilter.getUserFromToken(request))) {
            throw new ValidationException("Không có quyền truy cập");
        }
        Page<Catches> catchesList = catchesRepos.findByFishingLocationIdAndHiddenIsFalseOrderByTimeDesc(locationId, PageRequest.of(pageNo - 1, 10));
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
                .items(output)
                .build();
    }

    public PaginationDtoOut getPendingCatchReports(HttpServletRequest request, Long locationId, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Số trang không hợp lệ");
        }
        if (!isOwnerOrStaff(locationId, jwtFilter.getUserFromToken(request))) {
            throw new ValidationException("Không có quyền truy cập");
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
                .items(output)
                .build();
    }

    public PaginationDtoOut getPersonalCatchesList(HttpServletRequest request, int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException("Địa chỉ không tồn tại");
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
                .items(output)
                .build();
    }

    public Object getCatchesDetail(HttpServletRequest request, Long catchesId) {
        User user = jwtFilter.getUserFromToken(request);
        Catches catches = catchesRepos.findById(catchesId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi này!"));
        if (Boolean.TRUE.equals(catches.getHidden()) && catches.getUser() != user
        && catches.getApproved() != null) {
            throw new ValidationException("Không có quyền truy cập");
        }
        List<CatchesDetail> catchesDetailList = catches.getCatchesDetailList();
        List<CatchesFishDtoOut> fishes = new ArrayList<>();
        for (CatchesDetail catchesDetail : catchesDetailList) {
            CatchesFishDtoOut item = CatchesFishDtoOut.builder()
                    .name(catchesDetail.getFishSpecies().getName())
                    .image(catchesDetail.getFishSpecies().getImageUrl())
                    .quantity(catchesDetail.getQuantity())
                    .weight(catchesDetail.getWeight())
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
                .description(catches.getDescription())
                .images(ServiceUtils.splitString(catches.getImageUrl()))
                .time(ServiceUtils.convertDateToString(catches.getTime()))
                .fishes(fishes)
                .build();
    }

    private boolean isOwnerOrStaff(Long locationId, User user) {
        FishingLocation fishingLocation = fishingLocationRepos.getById(locationId);
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

    public Object catchReport(HttpServletRequest request, CatchReportDtoIn catchReportDtoIn) {
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
                    .returnToOwner(catchDetailDtoIn.isReturnToOwner())
                    .build();
            catchesDetailList.add(catchesDetail);
        }
        Catches catches = Catches.builder()
                .description(catchReportDtoIn.getDescription())
                .imageUrl(ServiceUtils.mergeString(catchReportDtoIn.getImages()))
                .time(LocalDateTime.now())
                .hidden(catchReportDtoIn.isHidden())
                .approved(null)
                .user(user)
                .fishingLocation(fishingLocation)
                .catchesDetailList(catchesDetailList)
                .build();
        catchesRepos.save(catches);
        return new ResponseTextDtoOut("Báo cá thành công, vui lòng chờ hồ câu duyệt!");
    }

    public ResponseTextDtoOut approveCatch(HttpServletRequest request, Long catchesId, boolean isApprove) {
        User user = jwtFilter.getUserFromToken(request);
        Catches catches = catchesRepos.findById(catchesId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi"));
        if (!catches.getFishingLocation().getOwner().equals(user)
                &&!catches.getFishingLocation().getEmployeeList().contains(user)) {
            throw new ValidationException("Không có quyền truy cập");
        }
        catches.setApproved(isApprove);
        catchesRepos.save(catches);
        return new ResponseTextDtoOut("Phê duyệt thành công");
    }
}
