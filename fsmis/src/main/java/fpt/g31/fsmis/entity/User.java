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

    private String address;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    private String qrString;

    @Column(columnDefinition = "TEXT")
    private String avatarUrl;

    private boolean gender;

    private boolean status;

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
    @ManyToMany
    @JoinTable(
            name = "tbl_user_notification",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "notification_id")
    )
    private List<Notification> notificationSet;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "tbl_user_saved_fishing_locations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "fishing_location_id")
    )
    private List<FishingLocation> savedFishingLocations;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;
}
