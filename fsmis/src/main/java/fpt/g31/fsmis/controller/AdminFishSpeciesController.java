package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.SpeciesDtoIn;
import fpt.g31.fsmis.service.FishSpeciesService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/fish")
@AllArgsConstructor
public class AdminFishSpeciesController {

    private final FishSpeciesService fishSpeciesService;

    @GetMapping()
    public ResponseEntity<Object> adminGetSpeciesList() {
        return new ResponseEntity<>(fishSpeciesService.getAll(true, false), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> adminAddSpecies(@RequestBody @Valid SpeciesDtoIn speciesDtoIn) {
        return new ResponseEntity<>(fishSpeciesService.addSpecies(speciesDtoIn), HttpStatus.OK);
    }

    @PutMapping("/edit/{speciesId}")
    public ResponseEntity<Object> adminEditSpecies(@RequestBody SpeciesDtoIn speciesDtoIn,
                                                   @PathVariable Long speciesId) {
        return new ResponseEntity<>(fishSpeciesService.editSpecies(speciesDtoIn, speciesId), HttpStatus.OK);
    }

    @PatchMapping("/change-active/{speciesId}")
    public ResponseEntity<Object> adminChangeSpeciesActive(@PathVariable Long speciesId) {
        return new ResponseEntity<>(fishSpeciesService.changeSpeciesActive(speciesId), HttpStatus.OK);
    }
}
