package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.service.CheckInService;
import fpt.g31.fsmis.service.FishingLocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/location")
public class FishingLocationController {
    final CheckInService checkInService;
    final FishingLocationService fishingLocationService;

    public FishingLocationController(CheckInService checkInService, FishingLocationService fishingLocationService) {
        this.checkInService = checkInService;
        this.fishingLocationService = fishingLocationService;
    }

    @GetMapping(path = "/all")
    public ResponseEntity<Object> getAll() {
        List<FishingLocation> fishingLocations = fishingLocationService.findAllFishingLocations();
        return new ResponseEntity<>(fishingLocations, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Object> getById(@RequestParam Long id) {
        return new ResponseEntity<>(fishingLocationService.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createFishingLocation(@Valid @RequestBody FishingLocationDtoIn fishingLocationDtoIn) {
        return new ResponseEntity<>(fishingLocationService.createFishingLocation(fishingLocationDtoIn), HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Object> disableFishingLocation(@RequestParam Long fishingLocationId, @RequestParam Long ownerId) {
        Boolean result = fishingLocationService.disableFishingLocation(fishingLocationId, ownerId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
