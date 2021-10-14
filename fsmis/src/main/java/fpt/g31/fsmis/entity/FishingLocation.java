package fpt.g31.fsmis.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.g31.fsmis.entity.address.Ward;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

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

    @ManyToOne
    @JoinColumn
    private Ward ward;

    private String phone;

    private String description;

    private String website;

    @NotNull
    private String service;

    @NotNull
    private String timetable;

    @NotNull
    private String rule;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<CheckIn> checkInList;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Post> postList;

    @JsonIgnore
    @ManyToOne
    @JoinColumn
    private User owner;

    @JsonIgnore
    @OneToMany
    @JoinTable(
            name = "tbl_employee_list",
            joinColumns = @JoinColumn(name = "fishing_spot_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")
    )
    private List<User> employeeList;

//    @JsonIgnore
//    @ManyToMany(mappedBy = "savedFishingLocations")
//    private Set<User> savedUser;

    @JsonIgnore
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Review> reviewList;

    @JsonIgnore
    @OneToMany(mappedBy = "id")
    private List<Lake> lakeList;

    @JsonIgnore
    @OneToMany(mappedBy = "id")
    private List<Catches> catchesList;

    private LocalDateTime createdDate;
    private LocalDateTime lastEditedDate;
    private Boolean active;
    private Boolean verify;
}
