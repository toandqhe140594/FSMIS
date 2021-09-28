package fpt.g31.fsmis.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tbl_FishingSpots")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FishingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column//(name = "fishingSpotId")
    private Long id;

    @Column//(name = "name")
    @NotNull
    private String name;

    @Column//(name = "longitude")
    @NotNull
    private float longitude;

    @Column//(name="latitude")
    @NotNull
    private float latitude;

    @Column//(name = "address")
    @NotNull
    private String address;


}
