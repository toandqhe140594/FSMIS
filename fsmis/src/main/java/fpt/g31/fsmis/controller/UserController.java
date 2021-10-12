package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/user")
public class UserController {
    UserServiceImpl userServiceImpl;

    @Autowired
    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @GetMapping
    public List<User> getAll() {
        return userServiceImpl.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User newUser) {
        return userServiceImpl.createUser(newUser);
    }

    @PutMapping
    public User updateUser(@RequestBody User newUser) {
        return userServiceImpl.updateUser(newUser);
    }

//    @PostMapping("/login")
//    @ApiOperation(value = "${UserController.login}")
//    @ApiResponses(value = {
//            @ApiResponse(code = 400, message = "Something went wrong"),
//            @ApiResponse(code = 422, message = "Invalid phone/password supplied")})
//    public ResponseEntity<Object> login(@RequestBody UserLoginDto userLoginDto) {
//        String phone = userLoginDto.getPhone();
//        String password = userLoginDto.getPassword();
//        try {
//            return new ResponseEntity<>(userServiceImpl.login(phone, password), HttpStatus.OK);
//        } catch (Exception e) {
//
//        }
//        return null;
//    }

}
