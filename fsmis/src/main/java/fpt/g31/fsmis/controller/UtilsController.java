package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.ValidateOtpDtoIn;
import fpt.g31.fsmis.service.FishSpeciesService;
import fpt.g31.fsmis.service.FishingMethodService;
import fpt.g31.fsmis.service.TwilioOtpService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/util")
@AllArgsConstructor
public class UtilsController {

    private final FishSpeciesService fishSpeciesService;
    private final FishingMethodService fishingMethodService;
    private final TwilioOtpService twilioOtpService;

    @GetMapping("/fish")
    public ResponseEntity<Object> getAllFishSpecies(@RequestParam(required = false, defaultValue = "true") Boolean withImage) {
        return new ResponseEntity<>(fishSpeciesService.getAll(withImage), HttpStatus.OK);
    }

    @GetMapping("/fish/{speciesId}")
    public ResponseEntity<Object> getSpeciesById(@PathVariable Long speciesId) {
        return new ResponseEntity<>(fishSpeciesService.getById(speciesId), HttpStatus.OK);
    }

    @GetMapping("/method")
    public ResponseEntity<Object> getAllFishingMethods() {
        return new ResponseEntity<>(fishingMethodService.getAll(true), HttpStatus.OK);
    }

    @PostMapping("/otp/nonexisted")
    public ResponseEntity<Object> sendOtpToNonExistedPhone(@RequestParam String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtpForNonExistedUser(phone), HttpStatus.OK);
    }

    @PostMapping("/otp/existed")
    public ResponseEntity<Object> sendOtpToExistedPhone(@RequestParam String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtpForExistedUser(phone), HttpStatus.OK);
    }

    @PostMapping("/otp/any")
    public ResponseEntity<Object> sendOtpToAnyPhone(@RequestParam String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtp(phone), HttpStatus.OK);
    }

    @PostMapping("/otp/validate")
    public ResponseEntity<Object> validateOtp(@RequestBody ValidateOtpDtoIn validateOtpDtoIn) {
        return new ResponseEntity<>(twilioOtpService.validateOtp(validateOtpDtoIn), HttpStatus.OK);
    }
}
