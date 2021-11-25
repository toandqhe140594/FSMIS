package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tbl_fish_species")
public class FishSpecies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Boolean active;

    @Column(columnDefinition = "int default 0")
    private Integer appearanceCount;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;
}
