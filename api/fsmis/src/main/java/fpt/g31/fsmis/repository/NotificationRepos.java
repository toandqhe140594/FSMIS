package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Notification;
import fpt.g31.fsmis.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepos extends JpaRepository<Notification, Long> {
    Page<Notification> findAllByUserSetOrderByTimeDesc(User user, Pageable pageable);
}
