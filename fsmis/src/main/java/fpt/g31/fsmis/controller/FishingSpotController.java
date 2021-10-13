package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.service.CheckInService;
import fpt.g31.fsmis.service.FishingSpotService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/spot")
public class FishingSpotController {
    final CheckInService checkInService;
    final FishingSpotService fishingSpotService;

    public FishingSpotController(CheckInService checkInService, FishingSpotService fishingSpotService) {
        this.checkInService = checkInService;
        this.fishingSpotService = fishingSpotService;
    }

    @GetMapping
    public ResponseEntity<List<FishingLocation>> getAll() {
        List<FishingLocation> fishingLocations = fishingSpotService.findAllFishingSpots();
        return new ResponseEntity<>(fishingLocations, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FishingLocation> createFishingSpot(@RequestBody FishingLocation fishingLocation) {
        return new ResponseEntity<>(fishingSpotService.createFishingSpot(fishingLocation), HttpStatus.OK);
    }

    @PostMapping(path = "/{spotId}/checkin")
    public ResponseEntity<CheckIn> checkIn(@PathVariable Long spotId, @RequestParam Long userId) {
        return new ResponseEntity<>(checkInService.userCheckInFishingSpot(userId, spotId), HttpStatus.OK);
    }
}
