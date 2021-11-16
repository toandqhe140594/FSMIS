package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    private LocalDateTime time;

    private Boolean active;

    @ManyToOne
    @JoinColumn
    private User user;

    @OneToMany(mappedBy = "review")
    private List<Vote> voteList;

    @ManyToOne
    @JoinColumn()
    private FishingLocation fishingLocation;
}
