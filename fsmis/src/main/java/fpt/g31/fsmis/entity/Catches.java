package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_catches")
public class Catches {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn
    private User user;

    @OneToMany
    @JoinColumn
    private List<CatchesDetail> catchesDetailList;
}
