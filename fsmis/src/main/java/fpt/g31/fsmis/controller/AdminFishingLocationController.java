package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.AdminFishingLocationDtoIn;
import fpt.g31.fsmis.service.FishingLocationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/location")
@AllArgsConstructor
public class AdminFishingLocationController {

    private final FishingLocationService locationService;

    @GetMapping()
    public ResponseEntity<Object> adminGetLocationList(@RequestParam(required = false, defaultValue = "1") Integer pageNo,
                                                       @RequestParam(required = false) String input,
                                                       @RequestParam(required = false) Boolean active,
                                                       @RequestParam(required = false) Boolean verified) {
        return new ResponseEntity<>(locationService.adminGetLocationList(pageNo, input, active, verified), HttpStatus.OK);
    }

    @PostMapping("/verify/{locationId}")
    public ResponseEntity<Object> adminChangeVerify(@PathVariable Long locationId) {
        return new ResponseEntity<>(locationService.adminChangeVerify(locationId), HttpStatus.OK);
    }

    @PostMapping("/active/{locationId}")
    public ResponseEntity<Object> adminChangeActive(@PathVariable Long locationId) {
        return new ResponseEntity<>(locationService.adminChangeActive(locationId), HttpStatus.OK);
    }

    @GetMapping("/suggested")
    public ResponseEntity<Object> adminGetSuggestedLocationList() {
        return new ResponseEntity<>(locationService.adminGetSuggestedLocationList(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> adminCreateLocation(@RequestBody AdminFishingLocationDtoIn adminFishingLocationDtoIn) {
        return new ResponseEntity<>(locationService.adminCreateLocation(adminFishingLocationDtoIn), HttpStatus.OK);
    }

    @DeleteMapping("/suggested/remove/{suggestedLocationId}")
    public ResponseEntity<Object> adminRemoveSuggestedLocation(@PathVariable Long suggestedLocationId) {
        return new ResponseEntity<>(locationService.adminRemoveSuggestedLocation(suggestedLocationId), HttpStatus.OK);
    }
}
