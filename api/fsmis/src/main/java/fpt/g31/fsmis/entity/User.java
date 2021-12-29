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
@Table(name = "tbl_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(columnDefinition = "varchar(255) default ''")
    private String fullName;

    @Column(columnDefinition = "varchar(255) default ''")
    private String password;

    @Column(columnDefinition = "varchar(255) default ''")
    private String phone;

    @Column(columnDefinition = "timestamp default now()")
    private LocalDateTime dob;

    @Column(columnDefinition = "varchar(255) default ''")
    private String address;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    @Column(columnDefinition = "varchar(255) default ''")
    private String qrString;

    @Column(columnDefinition = "TEXT default 'https://picsum.photos/200'")
    private String avatarUrl;

    @Column(columnDefinition = "bool default true")
    private Boolean gender;

    @Column(columnDefinition = "bool default true")
    private Boolean available;

    @Column(columnDefinition = "bool default true")
    private Boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<CheckIn> checkInList;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Catches> catchesList;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviewList;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Report> reportList;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "tbl_user_notification",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "notification_id")
    )
    private List<Notification> notificationSet;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "tbl_user_saved_fishing_locations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "fishing_location_id")
    )
    private List<FishingLocation> savedFishingLocations;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Role> roles;
}
