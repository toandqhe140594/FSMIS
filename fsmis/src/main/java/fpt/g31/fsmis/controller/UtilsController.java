package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.FishSpeciesService;
import fpt.g31.fsmis.service.FishingMethodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/util")
@AllArgsConstructor
public class UtilsController {

    private final FishSpeciesService fishSpeciesService;
    private final FishingMethodService fishingMethodService;

    @GetMapping("/fish")
    public ResponseEntity<Object> getAllFishSpecies(@RequestParam(required = false) boolean withImage) {
        return new ResponseEntity<>(fishSpeciesService.getAll(withImage), HttpStatus.OK);
    }

    @GetMapping("/fish/{speciesId}")
    public ResponseEntity<Object> getSpeciesById(@PathVariable Long speciesId){
        return new ResponseEntity<>(fishSpeciesService.getById(speciesId), HttpStatus.OK);
    }

    @GetMapping("/method")
    public ResponseEntity<Object> getAllFishingMethods() {
        return new ResponseEntity<>(fishingMethodService.getAll(), HttpStatus.OK);
    }
}
