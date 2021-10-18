package fpt.g31.fsmis.entity.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_ward")
public class Ward {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Nullable
    private String name;

    @Nullable
    private String type;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

}