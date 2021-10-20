package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.FishSpeciesService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/species")
public class FishSpeciesController {
    private FishSpeciesService fishSpeciesService;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllSpecies(){
        return new ResponseEntity<>(fishSpeciesService.getAll(), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Object> getSpeciesById(@RequestParam Long speciesId){
        return new ResponseEntity<>(fishSpeciesService.getById(speciesId), HttpStatus.OK);
    }
}
