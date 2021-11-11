package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/report")
@AllArgsConstructor
public class AdminReportController {

    private final ReportService reportService;

    @GetMapping("/location")
    public ResponseEntity<Object> getLocationReports(@RequestParam(defaultValue = "1", required = false) int pageNo) {
        return new ResponseEntity<>(reportService.getLocationReports(pageNo), HttpStatus.OK);
    }

    @GetMapping("/review")
    public ResponseEntity<Object> getReviewReports(@RequestParam(defaultValue = "1", required = false) int pageNo) {
        return new ResponseEntity<>(reportService.getReviewReports(pageNo), HttpStatus.OK);
    }

     @GetMapping("/post")
     public ResponseEntity<Object> getPostReports(@RequestParam(defaultValue = "1", required = false) int pageNo) {
         return new ResponseEntity<>(reportService.getPostReport(pageNo), HttpStatus.OK);
     }

    @GetMapping("/catch")
    public ResponseEntity<Object> getImproperCatchReports(@RequestParam(defaultValue = "1", required = false) int pageNo) {
        return new ResponseEntity<>(reportService.getImproperCatchReports(pageNo), HttpStatus.OK);
    }
    // @GetMapping("/location/{reportId}")

    // @GetMapping("/review/{reportId}")

    // @GetMapping("/post/{reportId}")

    // @PostMapping("/{reportId}/solved")
}
