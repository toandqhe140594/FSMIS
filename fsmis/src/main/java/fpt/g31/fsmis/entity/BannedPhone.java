package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_banned_phone")
public class BannedPhone {
    @Id
    private String phone;

    private String description;

    @Column(columnDefinition = "TEXT")
    private String image;

    private LocalDateTime bannedDate;
}