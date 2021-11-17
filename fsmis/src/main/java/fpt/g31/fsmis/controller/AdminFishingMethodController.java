package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.MethodDtoIn;
import fpt.g31.fsmis.service.FishingMethodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/method")
@AllArgsConstructor
public class AdminFishingMethodController {

    private final FishingMethodService fishingMethodService;

    @GetMapping()
    public ResponseEntity<Object> adminGetMethodList() {
        return new ResponseEntity<>(fishingMethodService.getAll(false), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> adminAddMethod(@RequestBody @Valid MethodDtoIn methodDtoIn) {
        return new ResponseEntity<>(fishingMethodService.addMethod(methodDtoIn), HttpStatus.OK);
    }

    @PutMapping("/edit/{methodId}")
    public ResponseEntity<Object> adminEditMethod(@RequestBody @Valid MethodDtoIn methodDtoIn,
                                                  @PathVariable Long methodId) {
        return new ResponseEntity<>(fishingMethodService.editMethod(methodDtoIn, methodId), HttpStatus.OK);
    }

    @PatchMapping("active/{methodId}")
    public ResponseEntity<Object> adminChangeMethodActive(@PathVariable Long methodId) {
        return new ResponseEntity<>(fishingMethodService.changeMethodActive(methodId), HttpStatus.OK);
    }
}
