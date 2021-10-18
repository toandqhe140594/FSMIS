package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.springframework.lang.Nullable;
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

    @Nullable
    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    private LocalDateTime time;

    @NotNull
    private Boolean hidden;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private FishingLocation fishingLocation;

    @OneToMany
    @JoinColumn
    private List<CatchesDetail> catchesDetailList;
}
