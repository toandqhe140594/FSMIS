package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.UserDtoIn;
import fpt.g31.fsmis.dto.output.UserDtoOut;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "/api/personal")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping()
    public ResponseEntity<Object> getPersonalInformation(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getPersonalInformation(request), HttpStatus.OK);
    }

    // @GetMapping("/status")

    // @GetMapping("/notification")

    // @PostMapping("/edit")

    // @PostMapping("/changepassword")

    // @PostMapping("/changephone")

    // @PostMapping("/changephone/otp")

    @GetMapping("/catch")
    public ResponseEntity<Object> getPersonalCatchList(HttpServletRequest request) {
        return new ResponseEntity<>(userService.getPersonalCatchList(request), HttpStatus.OK);
    }

    @GetMapping("/catch/{catchId}")
    public ResponseEntity<Object> getPersonalCatchDetails(HttpServletRequest request, @PathVariable Long catchId) {
        return new ResponseEntity<>(userService.getPersonalCatchDetails(request, catchId), HttpStatus.OK);
    }

    // @GetMapping("/save")
    // public ResponseEntity<Object> getSavedFishingLocation(HttpServletRequest request) {
    //     return new ResponseEntity<>(null, HttpStatus.OK)
    // }

    // @GetMapping("/checkin")
}
