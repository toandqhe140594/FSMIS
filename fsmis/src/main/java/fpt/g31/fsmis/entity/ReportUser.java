package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_report_user")
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
