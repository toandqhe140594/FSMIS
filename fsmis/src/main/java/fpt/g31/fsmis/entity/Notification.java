package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

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

    private String description;

    @ManyToMany(mappedBy = "notificationSet")
    private Set<User> userSet;
}
