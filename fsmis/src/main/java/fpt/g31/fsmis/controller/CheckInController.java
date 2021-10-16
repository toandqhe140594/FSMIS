package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.CheckInService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/checkin")
@AllArgsConstructor
public class CheckInController {
    private CheckInService checkInService;

    @PostMapping(path = "/{locationId}")
    public ResponseEntity<Object> checkIn(@PathVariable Long locationId, @RequestBody String qrString) {
        return new ResponseEntity<>(checkInService.checkIn(qrString, locationId), HttpStatus.OK);
    }
}
