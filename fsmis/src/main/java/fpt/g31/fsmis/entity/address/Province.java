package fpt.g31.fsmis.entity.address;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.Nullable;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_province")
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Nullable
    private String name;

    @Nullable
    private String type;

    @JsonIgnore
    @OneToMany(mappedBy = "province", cascade = CascadeType.ALL)
    private List<District> districtList;

}