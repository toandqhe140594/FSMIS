package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_lake")
public class Lake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Float depth;
    private LocalDateTime lastStockingTime;
    private Long price;

    @ManyToOne
    @JoinColumn
    private FishingSpot fishingSpot;

    @ManyToMany
    @JoinTable(
            name = "tbl_lake_fishing_method",
            joinColumns = @JoinColumn(name = "lake_id"),
            inverseJoinColumns = @JoinColumn(name = "fishing_method_id")
    )
    private List<FishingMethod> fishingMethodList;
}
