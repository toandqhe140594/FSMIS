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
    public ResponseEntity<Object> getLocationReports(@RequestParam(defaultValue = "1", required = false) int pageNo,
                                                     @RequestParam(defaultValue = "true", required = false) boolean active) {
        return new ResponseEntity<>(reportService.getLocationReports(pageNo, active), HttpStatus.OK);
    }

    @GetMapping("/review")
    public ResponseEntity<Object> getReviewReports(@RequestParam(defaultValue = "1", required = false) int pageNo,
                                                   @RequestParam(defaultValue = "true", required = false) boolean active) {
        return new ResponseEntity<>(reportService.getReviewReports(pageNo, active), HttpStatus.OK);
    }

     @GetMapping("/post")
     public ResponseEntity<Object> getPostReports(@RequestParam(defaultValue = "1", required = false) int pageNo,
                                                  @RequestParam(defaultValue = "true", required = false) boolean active) {
         return new ResponseEntity<>(reportService.getPostReports(pageNo, active), HttpStatus.OK);
     }

    @GetMapping("/catch")
    public ResponseEntity<Object> getImproperCatchReports(@RequestParam(defaultValue = "1", required = false) int pageNo,
                                                          @RequestParam(defaultValue = "true", required = false) boolean active) {
        return new ResponseEntity<>(reportService.getImproperCatchReports(pageNo, active), HttpStatus.OK);
    }
    // @GetMapping("/location/{reportId}")

    // @GetMapping("/review/{reportId}")

    // @GetMapping("/post/{reportId}")

     @PostMapping("/solved/{reportId}")
    public ResponseEntity<Object> markReportAsSolved(@PathVariable Long reportId) {
        return new ResponseEntity<>(reportService.markReportAsSolved(reportId), HttpStatus.OK);
     }
}
