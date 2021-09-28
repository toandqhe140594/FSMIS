package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.repository.UserRepos;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepos userRepos;

    public UserService(UserRepos userRepos) {
        this.userRepos = userRepos;
    }

    public List<User> getUsers() {
        return userRepos.findAll();
    }

    public User createUser(User user) {
        return userRepos.save(user);
    }

}
