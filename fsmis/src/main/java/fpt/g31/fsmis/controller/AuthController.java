package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.AuthDtoIn;
import fpt.g31.fsmis.dto.input.RegistrationDtoIn;
import fpt.g31.fsmis.dto.input.ValidateOtpDtoIn;
import fpt.g31.fsmis.service.AuthService;
import fpt.g31.fsmis.service.TwilioOtpService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final TwilioOtpService twilioOtpService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthDtoIn authDtoIn) {
        return new ResponseEntity<>(authService.login(authDtoIn), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegistrationDtoIn registrationDtoIn) {
        return new ResponseEntity<>(authService.register(registrationDtoIn), HttpStatus.CREATED);
    }

    @PostMapping("/forgot")
    public ResponseEntity<Object> changeForgotPassword(@RequestBody AuthDtoIn authDtoIn) {
        return new ResponseEntity<>(authService.changeForgotPassword(authDtoIn), HttpStatus.OK);
    }

    @PostMapping("/otp/register")
    public ResponseEntity<Object> sendOtpRegister(@RequestParam String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtpForNonExistedUser(phone), HttpStatus.OK);
    }

    @PostMapping("/otp/forgot")
    public ResponseEntity<Object> sendOtpForgotPassword(@RequestParam String phone) {
        return new ResponseEntity<>(twilioOtpService.sendOtpForExistedUser(phone), HttpStatus.OK);
    }

    // OTP: Validate OTP
    @PostMapping("/otp/validate")
    public ResponseEntity<Object> validateOtp(@RequestBody ValidateOtpDtoIn validateOtpDtoIn) {
        return new ResponseEntity<>(twilioOtpService.validateOtp(validateOtpDtoIn), HttpStatus.OK);
    }
}
