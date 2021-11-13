package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ReportDtoIn;
import fpt.g31.fsmis.dto.output.PaginationDtoOut;
import fpt.g31.fsmis.dto.output.ReportDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
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

    public PaginationDtoOut getLocationReports(int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> locationReportList = reportRepos.findAllByFishingLocationIdNotNullOrderByActiveDescTimeDesc(PageRequest.of(pageNo - 1, 10));
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

    public PaginationDtoOut getReviewReports(int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> locationReportList = reportRepos.findAllByReviewIdNotNullOrderByActiveDescTimeDesc(PageRequest.of(pageNo - 1, 10));
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

    public PaginationDtoOut getPostReport(int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> locationReportList = reportRepos.findAllByPostIdNotNullOrderByActiveDescTimeDesc(PageRequest.of(pageNo - 1, 10));
        for (Report report : locationReportList) {
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
                .totalPage(locationReportList.getTotalPages())
                .pageNo(pageNo)
                .totalItem(locationReportList.getTotalElements())
                .items(output)
                .build();
    }

    public PaginationDtoOut getImproperCatchReports(int pageNo) {
        if (pageNo <= 0) {
            throw new ValidationException(INVALID_PAGE_NUMBER);
        }
        List<ReportDtoOut> output = new ArrayList<>();
        Page<Report> locationReportList = reportRepos.findAllByCatchesIdNotNullOrderByActiveDescTimeDesc(PageRequest.of(pageNo - 1, 10));
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
}
