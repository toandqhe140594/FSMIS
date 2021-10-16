package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.LoginDtoIn;
import fpt.g31.fsmis.dto.input.RegistrationDtoIn;
import fpt.g31.fsmis.dto.output.AuthTokenDtoOut;
import fpt.g31.fsmis.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    // UC-01: Login
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginDtoIn loginDtoIn) {
        AuthTokenDtoOut authTokenDtoOut = authService.login(loginDtoIn);
        return new ResponseEntity<>(authTokenDtoOut, HttpStatus.OK);
    }

    // UC-02: Register
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegistrationDtoIn registrationDtoIn) {
        authService.register(registrationDtoIn);
        return new ResponseEntity<>("Đăng ký thành công", HttpStatus.OK);
    }

    // Send OTP Register
    @PostMapping("/OTP")
    public ResponseEntity<Object> sendOTP(@RequestBody String phone) {

        return new ResponseEntity<>("Hello!", HttpStatus.OK);
    }
}
