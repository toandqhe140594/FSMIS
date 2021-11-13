package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BannedPhone {
    @Id
    private String phone;

    private String description;
}
