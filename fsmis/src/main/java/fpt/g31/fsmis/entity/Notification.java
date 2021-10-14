package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue
    private Long id;

    private String description;

    @ManyToMany
    @JoinColumn
    private List<User> userList;
}
