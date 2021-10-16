package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.UserDtoIn;
import fpt.g31.fsmis.dto.output.UserDtoOut;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.UserNotFoundException;
import fpt.g31.fsmis.repository.UserRepos;
import fpt.g31.fsmis.repository.WardRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepos userRepos;
    private final ModelMapper modelMapper;
    private final WardRepos wardRepos;

    public List<User> getAllUsers() {
        return userRepos.findAll();
    }

    public Boolean createUser(UserDtoIn userDtoIn) {
        User user = modelMapper.map(userDtoIn, User.class);
        //todo: check if qr string already exist
        user.setQrString(UUID.randomUUID().toString());
        user.setActive(true);
        user.setWard(wardRepos.getById(userDtoIn.getWardId()));
        userRepos.save(user);
        return true;
    }

    public User updateUser(UserDtoIn userDtoIn, long userId) {
        Optional<User> userOptionalById = userRepos.findById(userId);
        if (userOptionalById.isPresent()) {
            User user = userOptionalById.get();
            User newUser = modelMapper.map(userDtoIn, User.class);
            modelMapper.map(newUser, user);
            return userRepos.save(user);
        } else {
            throw new UserNotFoundException(userId);
        }
    }

    public UserDtoOut getUserById(long id) {
        Optional<User> userOptional = userRepos.findById(id);
        UserDtoOut userDtoOut;
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userDtoOut = modelMapper.map(user, UserDtoOut.class);
            userDtoOut.setAddressFromWard(Utility.getAddressByWard(user.getWard()));
            return userDtoOut;
        } else {
            throw new UserNotFoundException(id);
        }
    }


}
