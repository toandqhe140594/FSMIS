package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.ChangePasswordDtoIn;
import fpt.g31.fsmis.dto.input.PersonalInfoDtoIn;
import fpt.g31.fsmis.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api/personal")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final CatchesService catchesService;
    private final CheckInService checkInService;
    private final FishingLocationService fishingLocationService;
    private final TwilioOtpService twilioOtpService;

    @GetMapping()
    public ResponseEntity<Object> getPersonalInformation(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getPersonalInformation(request), HttpStatus.OK);
    }

     @GetMapping("/availability")
     public ResponseEntity<Object> isAvailable(HttpServletRequest request){
        return new ResponseEntity<>(userService.isAvailable(request), HttpStatus.OK);
     }

    @GetMapping("/notification")
    public ResponseEntity<Object> getPersonalNotification(HttpServletRequest request, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(userService.getPersonalNotification(request, pageNo), HttpStatus.OK);
    }

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
    public ResponseEntity<Object> getPersonalCatchesList(HttpServletRequest request, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(catchesService.getPersonalCatchesList(request, pageNo), HttpStatus.OK);
    }

    @GetMapping("/save")
    public ResponseEntity<Object> getSavedFishingLocationList(HttpServletRequest request, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(fishingLocationService.getSavedFishingLocationList(request, pageNo), HttpStatus.OK);
    }

    @GetMapping("/checkin")
    public ResponseEntity<Object> getCheckInHistory(HttpServletRequest request, @RequestParam(defaultValue = "1") int pageNo) {
        return new ResponseEntity<>(checkInService.getPersonalCheckInHistoryList(request, pageNo), HttpStatus.OK);
    }
}
