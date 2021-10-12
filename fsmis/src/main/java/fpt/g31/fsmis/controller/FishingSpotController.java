package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.entity.CheckIn;
import fpt.g31.fsmis.entity.FishingSpot;
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
    public ResponseEntity<List<FishingSpot>> getAll() {
        List<FishingSpot> fishingSpots = fishingSpotService.findAllFishingSpots();
        return new ResponseEntity<>(fishingSpots, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FishingSpot> createFishingSpot(@RequestBody FishingSpot fishingSpot) {
        return new ResponseEntity<>(fishingSpotService.createFishingSpot(fishingSpot), HttpStatus.OK);
    }

    @PostMapping(path = "/{spotId}/checkin")
    public ResponseEntity<CheckIn> checkIn(@PathVariable Long spotId, @RequestParam Long userId) {
        return new ResponseEntity<>(checkInService.userCheckInFishingSpot(userId, spotId), HttpStatus.OK);
    }
}
