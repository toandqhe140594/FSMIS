package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.CatchReportDtoIn;
import fpt.g31.fsmis.service.CatchesService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/catches")
@AllArgsConstructor
public class CatchesController {

    private final CatchesService catchesService;

    @GetMapping("/{catchesId}")
    public ResponseEntity<Object> getCatchesDetails(HttpServletRequest request, @PathVariable Long catchesId) {
        return new ResponseEntity<>(catchesService.getCatchesDetail(request, catchesId), HttpStatus.OK);
    }

    @PostMapping("/approve/{catchesId}")
    public ResponseEntity<Object> approveCatch(HttpServletRequest request,
                                               @PathVariable Long catchesId,
                                               @RequestParam boolean isApprove){
        return new ResponseEntity<>(catchesService.approveCatch(request, catchesId, isApprove), HttpStatus.OK);
    }

    @PostMapping("/report")
    public ResponseEntity<Object> catchReport(HttpServletRequest request, @RequestBody @Valid CatchReportDtoIn catchReportDtoIn) {
        return new ResponseEntity<>(catchesService.catchReport(request, catchReportDtoIn), HttpStatus.OK);
    }
}
