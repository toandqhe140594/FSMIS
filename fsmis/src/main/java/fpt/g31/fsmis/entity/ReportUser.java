package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportUser {
    @Id
    @GeneratedValue
    private Long id;
    private String description;
    private LocalDateTime time;

    @ManyToOne
    private User user;

    @ManyToOne
    private Report report;


}
