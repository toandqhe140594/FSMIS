package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.AuthDtoIn;
import fpt.g31.fsmis.dto.input.RegistrationDtoIn;
import fpt.g31.fsmis.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    // UC-01: Login
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody AuthDtoIn authDtoIn) {
        return new ResponseEntity<>(authService.login(authDtoIn), HttpStatus.OK);
    }

    // UC-02: Register
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegistrationDtoIn registrationDtoIn) {
        return new ResponseEntity<>(authService.register(registrationDtoIn), HttpStatus.CREATED);
    }

    // UC-03: Forgot Password
    @PostMapping("/forgot")
    public ResponseEntity<Object> changeForgotPassword(@RequestBody AuthDtoIn authDtoIn) {
        return new ResponseEntity<>(authService.changeForgotPassword(authDtoIn), HttpStatus.OK);
    }
}
