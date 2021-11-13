package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.FishingLocationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/location")
@AllArgsConstructor
public class AdminFishingLocationController {

    private final FishingLocationService locationService;

    @GetMapping()
    public ResponseEntity<Object> getLocationList(@RequestParam(required = false, defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(locationService.adminGetLocationList(pageNo), HttpStatus.OK);
    }

    @GetMapping("/banned")
    public ResponseEntity<Object> getBannedPhoneList(){
        return new ResponseEntity<>(locationService.getBannedPhone(), HttpStatus.OK);
    }
    // @PostMapping("/{locationId}/verify")
}
