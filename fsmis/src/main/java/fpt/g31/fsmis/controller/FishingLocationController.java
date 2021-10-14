package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.dto.FishingLocationDtoInput;
import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.service.CheckInService;
import fpt.g31.fsmis.service.FishingLocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/location")
public class FishingLocationController {
    final CheckInService checkInService;
    final FishingLocationService fishingLocationService;

    public FishingLocationController(CheckInService checkInService, FishingLocationService fishingLocationService) {
        this.checkInService = checkInService;
        this.fishingLocationService = fishingLocationService;
    }

    @GetMapping
    public ResponseEntity<List<FishingLocation>> getAll() {
        List<FishingLocation> fishingLocations = fishingLocationService.findAllFishingSpots();
        return new ResponseEntity<>(fishingLocations, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createFishingLocation(@Valid @RequestBody FishingLocationDtoInput fishingLocationDtoInput) {
        FishingLocation result = fishingLocationService.createFishingLocation(fishingLocationDtoInput);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> disableFishingLocation(@RequestParam Long fishingLocationId, @RequestParam Long ownerId) {
        Boolean result = fishingLocationService.disableFishingLocation(fishingLocationId, ownerId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping(path = "/{spotId}/checkin")
    public ResponseEntity<CheckIn> checkIn(@PathVariable Long spotId, @RequestParam Long userId) {
        return new ResponseEntity<>(checkInService.userCheckInFishingSpot(userId, spotId), HttpStatus.OK);
    }
}
