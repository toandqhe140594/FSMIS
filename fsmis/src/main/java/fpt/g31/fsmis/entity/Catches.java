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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_catches")
public class Catches {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @NotNull
    private LocalDateTime time;

    @NotNull
    private Boolean hidden;

    private Boolean approved;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private FishingLocation fishingLocation;

    private Long lakeId;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "catches_id")
    private List<CatchesDetail> catchesDetailList;
}
