package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_notification")
public class Notification {
    @Id
    @GeneratedValue
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime time;

    @ManyToMany(mappedBy = "notificationSet")
    private List<User> userSet;
}
