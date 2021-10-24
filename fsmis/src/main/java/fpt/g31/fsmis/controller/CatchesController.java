package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.CatchesService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/catches")
@AllArgsConstructor
public class CatchesController {

    private final CatchesService catchesService;

    @GetMapping("/{catchesId}")
    public ResponseEntity<Object> getCatchesDetails(HttpServletRequest request, @PathVariable Long catchesId) {
        return new ResponseEntity<>(catchesService.getCatchesDetail(request, catchesId), HttpStatus.OK);
    }
}
