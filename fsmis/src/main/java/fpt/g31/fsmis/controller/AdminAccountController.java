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
    public ResponseEntity<Object> getAccountList(@RequestParam(required = false, defaultValue = "1") int pageNo,
                                                 @RequestParam(required = false, defaultValue = "") String phone) {
         return new ResponseEntity<>(userService.adminGetAccountList(pageNo, phone), HttpStatus.OK);
    }

    // @GetMapping("{userId}")

     @PostMapping("/change-active/{userId}")
    public ResponseEntity<Object> changeActive(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.adminChangeActive(userId), HttpStatus.OK);
     }
}
