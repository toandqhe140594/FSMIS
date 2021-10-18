package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_fishes_in_lake")
public class FishInLake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private FishSpecies fishSpecies;

    @ManyToOne
    @JoinColumn
    private Lake lake;

    private Float maxWeight;

    private Float minWeight;

    private Integer quantity;
    
    private Float totalWeight;
}
