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

    private boolean active;

    @ManyToOne
    @JoinColumn
    private User user;

    @OneToMany(mappedBy = "id")
    private List<Vote> voteList;

    @ManyToOne
    @JoinColumn()
    private FishingLocation fishingLocation;
}
