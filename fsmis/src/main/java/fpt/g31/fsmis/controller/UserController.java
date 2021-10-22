package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.ChangePasswordDtoIn;
import fpt.g31.fsmis.dto.input.PersonalInfoDtoIn;
import fpt.g31.fsmis.service.TwilioOtpService;
import fpt.g31.fsmis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api/personal")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final TwilioOtpService twilioOtpService;

    @GetMapping()
    public ResponseEntity<Object> getPersonalInformation(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getPersonalInformation(request), HttpStatus.OK);
    }

    // @GetMapping("/status")

    // @GetMapping("/notification")

    @PostMapping("/edit")
    public ResponseEntity<Object> editPersonalInformation(HttpServletRequest request, @RequestBody PersonalInfoDtoIn personalInfoDtoIn) {
        return new ResponseEntity<>(userService.savePersonalInformation(request, personalInfoDtoIn), HttpStatus.OK);
    }

    @PostMapping("/changepassword")
    public ResponseEntity<Object> changePassword(HttpServletRequest request, @RequestBody ChangePasswordDtoIn changePasswordDtoIn) {
        return new ResponseEntity<>(userService.changePassword(request, changePasswordDtoIn), HttpStatus.OK);
    }

    @PostMapping("/changephone")
    public ResponseEntity<Object> changePhone(HttpServletRequest request, @RequestParam String newPhone) {
        return new ResponseEntity<>(userService.changePhone(request, newPhone), HttpStatus.OK);
    }

    @PostMapping("/changephone/otp")
    public ResponseEntity<Object> sendOtpChangePhone(@RequestParam String newPhone) {
        return new ResponseEntity<>(twilioOtpService.sendOtpForNonExistedUser(newPhone), HttpStatus.OK);
    }

    @GetMapping("/catch")
    public ResponseEntity<Object> getPersonalCatchList(HttpServletRequest request, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(userService.getPersonalCatchList(request, pageNo), HttpStatus.OK);
    }

    @GetMapping("/catch/{catchId}")
    public ResponseEntity<Object> getPersonalCatchDetails(HttpServletRequest request, @PathVariable Long catchId) {
        return new ResponseEntity<>(userService.getPersonalCatchDetails(request, catchId), HttpStatus.OK);
    }

    @GetMapping("/save")
    public ResponseEntity<Object> getSavedFishingLocation(HttpServletRequest request, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(userService.getSavedFishingLocation(request, pageNo), HttpStatus.OK);
    }

    @GetMapping("/checkin")
    public ResponseEntity<Object> getCheckInHistory(HttpServletRequest request, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(userService.getCheckInHistory(request, pageNo), HttpStatus.OK);
    }
}