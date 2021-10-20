package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.repository.FishSpeciesRepos;
import fpt.g31.fsmis.service.FishSpeciesService;
import fpt.g31.fsmis.service.FishingMethodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UtilsController {

    private final FishSpeciesService fishSpeciesService;
    private final FishingMethodService fishingMethodService;

    @GetMapping("/fish")
    public ResponseEntity<Object> getAllFishSpecies() {
        return new ResponseEntity<>(fishSpeciesService.getAll(), HttpStatus.OK);
    }

//    @GetMapping("/method")
//    public ResponseEntity<Object> getAllMethods() {
//        return new ResponseEntity<>(null, HttpStatus.OK);
//    }
}
