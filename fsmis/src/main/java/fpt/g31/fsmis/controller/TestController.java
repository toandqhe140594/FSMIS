package fpt.g31.fsmis.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@AllArgsConstructor
public class TestController {

    @GetMapping("/hello")
    public ResponseEntity<Object> hello() {
        return new ResponseEntity<>("Hello World!", HttpStatus.OK);
    }

    @GetMapping("/hi")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Object> hi() {
        return new ResponseEntity<>("Hi World!", HttpStatus.OK);
    }
}
