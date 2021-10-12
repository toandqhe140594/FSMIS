package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepos extends JpaRepository<User, Long> {

    User findByPhone(String phone);
}
