package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.ReportDtoIn;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.*;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
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

    public ResponseTextDtoOut reportFishingLocation(HttpServletRequest request, Long locationId, ReportDtoIn reportDtoIn) {
        User user = jwtFilter.getUserFromToken(request);
        FishingLocation location = locationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khu hồ"));
        Optional<Report> reportOptional = reportRepos.findByFishingLocationId(locationId);
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
        Optional<Report> reportOptional = reportRepos.findByReviewId(reviewId);
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
        Optional<Report> reportOptional = reportRepos.findByPostId(postId);
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
        Optional<Report> reportOptional = reportRepos.findByCatchesId(catchId);
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
}
