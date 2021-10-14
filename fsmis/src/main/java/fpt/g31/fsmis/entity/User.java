package fpt.g31.fsmis.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.g31.fsmis.entity.address.Ward;
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
@Table(name = "tbl_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    private String password;

    private String phone;

    private LocalDateTime dob;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    private String qrString;

    private String avatarUrl = "https://picsum.photos/200";

    private boolean gender;

    private boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<CheckIn> checkInList;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Catches> catchesList;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Review> reviewList;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Report> reportList;

    @JsonIgnore
    @OneToMany(mappedBy = "id")
    private List<Notification> notificationList;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_saved_fishing_locations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "fishing_location_id")
    )
    private Set<FishingLocation> savedFishingLocations;


}
