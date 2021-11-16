package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/report")
@AllArgsConstructor
public class AdminReportController {

    private final ReportService reportService;

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

    @GetMapping("/post/{reportId}")
    public ResponseEntity<Object> getPostReportDetail(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.getPostReportDetail(reportId), HttpStatus.OK);
    }

    @GetMapping("/catch/{reportId}")
    public ResponseEntity<Object> getImproperCatchReportDetail(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.getImproperCatchReportDetail(reportId), HttpStatus.OK);
    }

    @PostMapping("/solved/{reportId}")
    public ResponseEntity<Object> markReportAsSolved(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.markReportAsSolved(reportId), HttpStatus.OK);
    }
}
