package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ReportDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.*;
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
import java.util.Optional;

@AllArgsConstructor
@Service
public class ReportService {
    private final ReportRepos reportRepos;
    private final ReportUserRepos reportUserRepos;
    private final FishingLocationRepos locationRepos;
    private final ReviewRepos reviewRepos;
    private final PostRepos postRepos;
    private final CatchesRepos catchesRepos;
    private final JwtFilter jwtFilter;

    private static final String INVALID_PAGE_NUMBER = "Số trang không hợp lệ";

    public ResponseTextDtoOut reportFishingLocation(HttpServletRequest request, Long locationId, ReportDtoIn reportDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = locationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khu hồ"));
        Optional<Report> reportOptional = reportRepos.findByFishingLocationIdAndActiveIsTrue(locationId);
        Report report;
        if (!reportOptional.isPresent()) {
            report = Report.builder()
                    .fishingLocation(location)
                    .time(LocalDateTime.now())
                    .user(user)
                    .active(true)
                    .build();
            reportRepos.save(report);
        } else {
            report = reportOptional.get();
        }
        ReportUser reportUser = ReportUser.builder()
                .description(reportDtoIn.getDescription())
                .time(LocalDateTime.now())
                .user(user)
                .report(report)
                .build();
        reportUserRepos.save(reportUser);
        return new ResponseTextDtoOut("Báo cáo khu hồ thành công");
    }

    public ResponseTextDtoOut reportReview(HttpServletRequest request, Long reviewId, ReportDtoIn reportDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        Review review = reviewRepos.findById(reviewId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy đánh giá"));
        Optional<Report> reportOptional = reportRepos.findByReviewIdAndActiveIsTrue(reviewId);
        Report report;
        if (!reportOptional.isPresent()) {
            report = Report.builder()
                    .review(review)
                    .time(LocalDateTime.now())
                    .user(user)
                    .active(true)
                    .build();
            reportRepos.save(report);
        } else {
            report = reportOptional.get();
        }
        ReportUser reportUser = ReportUser.builder()
                .description(reportDtoIn.getDescription())
                .time(LocalDateTime.now())
                .user(user)
                .report(report)
                .build();
        reportUserRepos.save(reportUser);
        return new ResponseTextDtoOut("Báo cáo đánh giá thành công");
    }

    public ResponseTextDtoOut reportPost(HttpServletRequest request, Long postId, ReportDtoIn reportDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        Post post = postRepos.findById(postId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bài viết"));
        Optional<Report> reportOptional = reportRepos.findByPostIdAndActiveIsTrue(postId);
        Report report;
        if (!reportOptional.isPresent()) {
            report = Report.builder()
                    .post(post)
                    .time(LocalDateTime.now())
                    .user(user)
                    .active(true)
                    .build();
            reportRepos.save(report);
        } else {
            report = reportOptional.get();
        }
        ReportUser reportUser = ReportUser.builder()
                .description(reportDtoIn.getDescription())
                .time(LocalDateTime.now())
                .user(user)
                .report(report)
                .build();
        reportUserRepos.save(reportUser);
        return new ResponseTextDtoOut("Báo cáo bài viết thành công");
    }

    public ResponseTextDtoOut reportCatch(HttpServletRequest request, Long catchId, ReportDtoIn reportDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        Catches catches = catchesRepos.findById(catchId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy báo cá"));
        Optional<Report> reportOptional = reportRepos.findByCatchesIdAndActiveIsTrue(catchId);
        Report report;
        if (!reportOptional.isPresent()) {
            report = Report.builder()
                    .catches(catches)
                    .time(LocalDateTime.now())
                    .user(user)
                    .active(true)
                    .build();
            reportRepos.save(report);
        } else {
            report = reportOptional.get();
        }
        ReportUser reportUser = ReportUser.builder()
                .description(reportDtoIn.getDescription())
                .time(LocalDateTime.now())
                .user(user)
                .report(report)
                .build();
        reportUserRepos.save(reportUser);
        return new ResponseTextDtoOut("Báo cáo báo cá thành công");
    }

    public PaginationDtoOut getLocationReports(int pageNo, boolean active) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> locationReportList = reportRepos.findAllByFishingLocationIdNotNullAndActiveOrderByTimeDesc(active, PageRequest.of(pageNo - 1, 10));
        for (Report report : locationReportList) {
            ReportDtoOut dtoOut = ReportDtoOut.builder()
                    .id(report.getId())
                    .name(report.getFishingLocation().getName())
                    .time(ServiceUtils.convertDateToString(report.getTime()))
                    .active(report.isActive())
                    .build();
            output.add(dtoOut);
        }
        return PaginationDtoOut.builder()
                .totalPage(locationReportList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(locationReportList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut getReviewReports(int pageNo, boolean active) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> locationReportList = reportRepos.findAllByReviewIdNotNullAndActiveOrderByTimeDesc(active, PageRequest.of(pageNo - 1, 10));
        for (Report report : locationReportList) {
            ReportDtoOut dtoOut = ReportDtoOut.builder()
                    .id(report.getId())
                    .name(report.getReview().getUser().getFullName())
                    .avatar(report.getReview().getUser().getAvatarUrl())
                    .time(ServiceUtils.convertDateToString(report.getTime()))
                    .active(report.isActive())
                    .build();
            output.add(dtoOut);
        }
        return PaginationDtoOut.builder()
                .totalPage(locationReportList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(locationReportList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut getPostReports(int pageNo, boolean active) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> postReportList = reportRepos.findAllByPostIdNotNullAndActiveOrderByTimeDesc(active, PageRequest.of(pageNo - 1, 10));
        for (Report report : postReportList) {
            ReportDtoOut dtoOut = ReportDtoOut.builder()
                    .id(report.getId())
                    .name(report.getPost().getFishingLocation().getName())
                    .postType(report.getPost().getPostType().toString())
                    .time(ServiceUtils.convertDateToString(report.getTime()))
                    .active(report.isActive())
                    .build();
            output.add(dtoOut);
        }
        return PaginationDtoOut.builder()
                .totalPage(postReportList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(postReportList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut getImproperCatchReports(int pageNo, boolean active) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> locationReportList = reportRepos.findAllByCatchesIdNotNullAndActiveOrderByTimeDesc(active, PageRequest.of(pageNo - 1, 10));
        for (Report report : locationReportList) {
            ReportDtoOut dtoOut = ReportDtoOut.builder()
                    .id(report.getId())
                    .name(report.getCatches().getUser().getFullName())
                    .avatar(report.getCatches().getUser().getAvatarUrl())
                    .time(ServiceUtils.convertDateToString(report.getTime()))
                    .active(report.isActive())
                    .build();
            output.add(dtoOut);
        }
        return PaginationDtoOut.builder()
                .totalPage(locationReportList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(locationReportList.getTotalElements())
                .items(output)
                .build();
    }

    public ResponseTextDtoOut markReportAsSolved(Long reportId) {
        Report report = reportRepos.findById(reportId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy báo cáo"));
        report.setActive(true);
        reportRepos.save(report);
        return new ResponseTextDtoOut("Xử lý báo cáo thành công");
    }

    public LocationReportDetailDtoOut getLocationReportDetail(Long reportId) {
        Report report = reportRepos.findById(reportId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy báo cáo"));
        List<ReportUser> reportDetailList = reportUserRepos.findAllByReportId(reportId);
        List<ReportDetailItemDtoOut> reportDetailDtoOutList = getReportDetailDtoList(reportDetailList);
        return LocationReportDetailDtoOut.builder()
                .locationId(report.getFishingLocation().getId())
                .locationName(report.getFishingLocation().getName())
                .time(ServiceUtils.convertDateToString(report.getTime()))
                .reportDetailList(reportDetailDtoOutList)
                .build();

    }

    private List<ReportDetailItemDtoOut> getReportDetailDtoList(List<ReportUser> reportDetailList){
        List<ReportDetailItemDtoOut> reportDetailDtoOutList = new ArrayList<>();
        for (ReportUser reportDetail: reportDetailList) {
            ReportDetailItemDtoOut reportDetailItemDtoOut = ReportDetailItemDtoOut.builder()
                    .reportDetailId(reportDetail.getId())
                    .time(ServiceUtils.convertDateToString(reportDetail.getTime()))
                    .userFullName(reportDetail.getUser().getFullName())
                    .userAvatar(reportDetail.getUser().getAvatarUrl())
                    .description(reportDetail.getDescription())
                    .build();
            reportDetailDtoOutList.add(reportDetailItemDtoOut);
        }
        return reportDetailDtoOutList;
    }

    public PostReportDetailDtoOut getPostReportDetail(Long reportId) {
        Report report = reportRepos.findById(reportId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy báo cáo"));
        List<ReportUser> reportDetailList = reportUserRepos.findAllByReportId(reportId);
        List<ReportDetailItemDtoOut> reportDetailDtoOutList = getReportDetailDtoList(reportDetailList);
        Post post = report.getPost();
        PostDtoOut postDtoOut = PostDtoOut.builder()
                .id(post.getId())
                .content(post.getContent())
                .postTime(ServiceUtils.convertDateToString(post.getPostTime()))
                .postType(post.getPostType().toString())
                .url(post.getUrl())
                .attachmentType(post.getAttachmentType().toString())
                .edited(post.isEdited())
                .build();
        return PostReportDetailDtoOut.builder()
                .reportTime(ServiceUtils.convertDateToString(report.getTime()))
                .locationId(report.getPost().getFishingLocation().getId())
                .locationName(report.getPost().getFishingLocation().getName())
                .postDtoOut(postDtoOut)
                .reportDetailList(reportDetailDtoOutList)
                .build();
    }
}
