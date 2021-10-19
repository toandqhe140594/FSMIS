package fpt.g31.fsmis.controller;


import fpt.g31.fsmis.dto.input.FishingLocationDtoIn;
import fpt.g31.fsmis.dto.input.LakeDtoIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.service.CheckInService;
import fpt.g31.fsmis.service.FishingLocationService;
import fpt.g31.fsmis.service.LakeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/location")
@AllArgsConstructor
public class FishingLocationController {
    final CheckInService checkInService;
    final FishingLocationService fishingLocationService;
    final LakeService lakeService;

    @GetMapping(path = "/all")
    public ResponseEntity<Object> getAll() {
        List<FishingLocation> fishingLocations = fishingLocationService.findAllFishingLocations();
        return new ResponseEntity<>(fishingLocations, HttpStatus.OK);
    }

    @GetMapping(path = "/{locationId}")
    public ResponseEntity<Object> getById(@PathVariable Long locationId) {
        return new ResponseEntity<>(fishingLocationService.getById(locationId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createFishingLocation(@Valid @RequestBody FishingLocationDtoIn fishingLocationDtoIn) {
        return new ResponseEntity<>(fishingLocationService.createFishingLocation(fishingLocationDtoIn), HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Object> disableFishingLocation(@RequestParam Long fishingLocationId, @RequestParam Long ownerId) {
        return new ResponseEntity<>(fishingLocationService.disableFishingLocation(fishingLocationId, ownerId), HttpStatus.OK);
    }

    @PostMapping("/{locationId}/lake")
    public ResponseEntity<Object> createLake(@RequestBody @Valid LakeDtoIn lakeDtoIn, @PathVariable Long locationId){
        return new ResponseEntity<>(lakeService.createLake(lakeDtoIn, locationId), HttpStatus.CREATED);
    }

    @GetMapping("/nearby")
    public ResponseEntity<Object> getNearBy(@RequestParam Float latitude, @RequestParam Float longitude,
                                            @RequestParam Integer distance, @RequestParam Long methodId,
                                            @RequestParam Integer minRating){
        return new ResponseEntity<>(fishingLocationService.getNearBy(longitude, latitude, distance, methodId, minRating), HttpStatus.OK);
    }

    @GetMapping("/{locationId}/lake/all")
    public ResponseEntity<Object> getAllLakeByLocationId(@PathVariable Long locationId){
        return new ResponseEntity<>(lakeService.getAllByLocationId(locationId), HttpStatus.OK);
    }
}
