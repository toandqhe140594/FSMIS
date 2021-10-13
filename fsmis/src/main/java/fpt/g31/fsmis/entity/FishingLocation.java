package fpt.g31.fsmis.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tbl_fishing_location")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class FishingLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Float longitude;

    @NotNull
    private Float latitude;

    @NotNull
    private String address;

    private String website;

    @NotNull
    private String service;

    @NotNull
    private String timetable;

    @NotNull
    private String rule;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<CheckIn> checkInList;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Post> postList;

    @ManyToOne
    @JoinColumn
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User owner;

    @OneToMany
    @JoinTable(
            name = "tbl_employee_list",
            joinColumns = @JoinColumn(name = "fishing_spot_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<User> employeeList;

    @ManyToMany(mappedBy = "savedFishingLocations")
    private Set<User> savedUser;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Review> reviewList;

    private LocalDateTime createdDate;
    private LocalDateTime lastEditedDate;
}
