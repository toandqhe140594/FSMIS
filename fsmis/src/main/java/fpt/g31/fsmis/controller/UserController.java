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

@RestController
@RequestMapping(path = "/api/user")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    // ADMIN
    @GetMapping
    public ResponseEntity<UserDtoOut> getUserById(@RequestParam long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping
    public User updateUser(@RequestBody UserDtoIn userDtoIn, @RequestBody long userId) {
        return userService.updateUser(userDtoIn, userId);
    }
}
