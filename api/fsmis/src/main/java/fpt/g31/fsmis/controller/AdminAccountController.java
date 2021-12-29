package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/account")
@AllArgsConstructor
public class AdminAccountController {

    private final UserService userService;

    @GetMapping()
    public ResponseEntity<Object> adminGetAccountList(@RequestParam(required = false, defaultValue = "1") int pageNo,
                                                      @RequestParam(required = false, defaultValue = "") String input) {
        return new ResponseEntity<>(userService.adminGetAccountList(pageNo, input), HttpStatus.OK);
    }

    @GetMapping("{userId}")
    public ResponseEntity<Object> adminGetAccount(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.adminGetAccount(userId), HttpStatus.OK);
    }

    @PostMapping("/change-active/{userId}")
    public ResponseEntity<Object> adminChangeActive(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.adminChangeActive(userId), HttpStatus.OK);
    }
}
