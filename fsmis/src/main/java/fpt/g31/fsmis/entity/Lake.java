package fpt.g31.fsmis.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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
    private Float length;
    private Float width;
    private Float depth;
    private LocalDateTime lastEditTime;
    private String price;
    private boolean active;
    private String imageUrl;

    @JsonIgnore
    @ManyToOne
    @JoinColumn
    private FishingLocation fishingLocation;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "tbl_lake_fishing_method",
            joinColumns = @JoinColumn(name = "lake_id"),
            inverseJoinColumns = @JoinColumn(name = "fishing_method_id")
    )
    private Set<FishingMethod> fishingMethodSet;

    @OneToMany(mappedBy = "id")
    private List<FishInLake> fishInLakeList;
}
