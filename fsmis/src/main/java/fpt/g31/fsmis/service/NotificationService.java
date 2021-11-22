package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.Notification;
import fpt.g31.fsmis.entity.User;
import fpt.g31.fsmis.repository.NotificationRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {
    private final NotificationRepos notificationRepos;

    public static void createNotification(NotificationRepos notificationRepos, String description, List<User> userSet) {
        List<User> savedUser = new ArrayList<>(userSet);
        Notification notification = Notification.builder()
                .description(description)
                .time(LocalDateTime.now())
                .userSet(savedUser)
                .build();
        notificationRepos.save(notification);
    }
}
