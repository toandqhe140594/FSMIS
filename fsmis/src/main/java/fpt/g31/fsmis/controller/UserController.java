package fpt.g31.fsmis.controller;

import fpt.g31.fsmis.dto.input.UserDtoIn;
import fpt.g31.fsmis.dto.output.UserDtoOut;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {
    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping
    public ResponseEntity<UserDtoOut> getById(@RequestParam long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Boolean> createUser(@RequestBody @Valid UserDtoIn userDtoIn) {
        return new ResponseEntity<>(userService.createUser(userDtoIn), HttpStatus.CREATED);
    }

    @PutMapping
    public User updateUser(@RequestBody UserDtoIn userDtoIn, @RequestBody long userId) {
        return userService.updateUser(userDtoIn, userId);
    }


//    @PostMapping("/login")
//    @ApiOperation(value = "${UserController.login}")
//    @ApiResponses(value = {
//            @ApiResponse(code = 400, message = "Something went wrong"),
//            @ApiResponse(code = 422, message = "Invalid phone/password supplied")})
//    public ResponseEntity<Object> login(@RequestBody UserLoginDtoIn userLoginDto) {
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
