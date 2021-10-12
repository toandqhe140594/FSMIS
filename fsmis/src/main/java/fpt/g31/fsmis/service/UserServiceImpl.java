package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.exception.UserNotFoundException;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl {
    private final UserRepos userRepos;

    public List<User> getAllUsers() {
        return userRepos.findAll();
    }

    public User createUser(User user) {
        return userRepos.save(user);
    }

    public void deleteUser(Long id) {
        userRepos.deleteById(id);
    }

    public User updateUser(User newUser) {
        Optional<User> userOptionalById = userRepos.findById(newUser.getId());
        if (userOptionalById.isPresent()) {
            return userRepos.save(newUser);
        } else {
            throw new UserNotFoundException(newUser.getId());
        }
    }

//    public Object login(String phone, String password) {
//        try {
//            User findUser = userRepos.findByPhone(phone);
//            if (findUser != null) {
//                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phone, password));
//                if (!findUser.isActive()) {
//                    throw new ValidationException();
//                }
//            }
//        } catch (Exception e) {
//
//        }
//        return null;
//    }
}
