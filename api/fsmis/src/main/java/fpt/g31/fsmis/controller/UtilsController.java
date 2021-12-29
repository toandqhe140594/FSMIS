package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.ValidateOtpDtoIn;
import fpt.g31.fsmis.service.FishSpeciesService;
import fpt.g31.fsmis.service.FishingMethodService;
import fpt.g31.fsmis.service.TwilioOtpService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

@RestController
@RequestMapping("/api/util")
@AllArgsConstructor
@Validated
public class UtilsController {

    private final FishSpeciesService fishSpeciesService;
    private final FishingMethodService fishingMethodService;
    private final TwilioOtpService twilioOtpService;

    private static final String INVALID_PHONE = "Số điện thoại không hợp lệ";
    private static final String PHONE_REGEX = "^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$";

    @GetMapping("/fish")
    public ResponseEntity<Object> getAllFishSpecies(@RequestParam(required = false, defaultValue = "true") Boolean withImage) {
        return new ResponseEntity<>(fishSpeciesService.getAll(withImage, true), HttpStatus.OK);
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
    public ResponseEntity<Object> sendOtpToNonExistedPhone(@RequestParam @Pattern(regexp = PHONE_REGEX, message = INVALID_PHONE) String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtpForNonExistedUser(phone), HttpStatus.OK);
    }

    @PostMapping("/otp/existed")
    public ResponseEntity<Object> sendOtpToExistedPhone(@RequestParam @Pattern(regexp = PHONE_REGEX, message = INVALID_PHONE) String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtpForExistedUser(phone), HttpStatus.OK);
    }

    @PostMapping("/otp/any")
    public ResponseEntity<Object> sendOtpToAnyPhone(@RequestParam @Pattern(regexp = PHONE_REGEX, message = INVALID_PHONE) String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtp(phone), HttpStatus.OK);
    }

    @PostMapping("/otp/validate")
    public ResponseEntity<Object> validateOtp(@RequestBody @Valid ValidateOtpDtoIn validateOtpDtoIn) {
        return new ResponseEntity<>(twilioOtpService.validateOtp(validateOtpDtoIn), HttpStatus.OK);
    }
}
