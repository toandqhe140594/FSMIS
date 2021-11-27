package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/report")
@AllArgsConstructor
public class AdminReportController {

    private final ReportService reportService;
    private final ReviewService reviewService;
    private final PostService postService;
    private final CatchesService catchesService;

    @GetMapping("/location")
    public ResponseEntity<Object> getLocationReports(@RequestParam(defaultValue = "1", required = false) Integer pageNo,
                                                     @RequestParam(defaultValue = "true", required = false) Boolean active) {
        return new ResponseEntity<>(reportService.getLocationReports(pageNo, active), HttpStatus.OK);
    }

    @GetMapping("/review")
    public ResponseEntity<Object> getReviewReportList(@RequestParam(defaultValue = "1", required = false) Integer pageNo,
                                                      @RequestParam(defaultValue = "true", required = false) Boolean active) {
        return new ResponseEntity<>(reportService.getReviewReports(pageNo, active), HttpStatus.OK);
    }

    @GetMapping("/post")
    public ResponseEntity<Object> getPostReportList(@RequestParam(defaultValue = "1", required = false) Integer pageNo,
                                                    @RequestParam(defaultValue = "true", required = false) Boolean active) {
        return new ResponseEntity<>(reportService.getPostReports(pageNo, active), HttpStatus.OK);
    }

    @GetMapping("/catch")
    public ResponseEntity<Object> getImproperCatchReportList(@RequestParam(defaultValue = "1", required = false) Integer pageNo,
                                                             @RequestParam(defaultValue = "true", required = false) Boolean active) {
        return new ResponseEntity<>(reportService.getImproperCatchReports(pageNo, active), HttpStatus.OK);
    }

    @GetMapping("/location/{reportId}")
    public ResponseEntity<Object> getLocationReportDetail(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.getLocationReportDetail(reportId), HttpStatus.OK);
    }

    @GetMapping("/review/{reportId}")
    public ResponseEntity<Object> getReviewReportDetail(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.getReviewReportDetail(reportId), HttpStatus.OK);
    }

    @DeleteMapping("/review/delete/{reviewId}")
    public ResponseEntity<Object> deleteReview(@PathVariable Long reviewId) {
        return new ResponseEntity<>(reviewService.adminDeleteReview(reviewId), HttpStatus.OK);
    }

    @GetMapping("/post/{reportId}")
    public ResponseEntity<Object> getPostReportDetail(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.getPostReportDetail(reportId), HttpStatus.OK);
    }

    @DeleteMapping("/post/delete/{postId}")
    public ResponseEntity<Object> deletePost(@PathVariable Long postId) {
        return new ResponseEntity<>(postService.adminDeletePost(postId), HttpStatus.OK);
    }

    @GetMapping("/catch/{reportId}")
    public ResponseEntity<Object> getImproperCatchReportDetail(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.getImproperCatchReportDetail(reportId), HttpStatus.OK);
    }

    @DeleteMapping("/post/delete/{catchId}")
    public ResponseEntity<Object> deleteCatch(@PathVariable Long catchId) {
        return new ResponseEntity<>(catchesService.adminDeleteCatch(catchId), HttpStatus.OK);
    }

    @PostMapping("/solved/{reportId}")
    public ResponseEntity<Object> markReportAsSolved(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.markReportAsSolved(reportId), HttpStatus.OK);
    }
}
