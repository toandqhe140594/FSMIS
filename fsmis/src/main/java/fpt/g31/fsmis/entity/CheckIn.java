package fpt.g31.fsmis.entity;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_CheckIn")
public class CheckIn {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userId")
    @NotNull
    private User user;

    @ManyToOne
    @JoinColumn(name = "fishingSpotId")
    @NotNull
    private FishingSpot fishingSpot;

    @NotNull
    @Column//(name = "checkInTime")
    private LocalDateTime checkInTime;
}
