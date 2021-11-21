package fpt.g31.fsmis.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import fpt.g31.fsmis.entity.address.Ward;
import lombok.*;

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
@Builder
public class FishingLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    private String unsignedName;

    @NotNull
    private Float longitude;

    @NotNull
    private Float latitude;

    @NotNull
    private String address;

    @ManyToOne
    @JoinColumn
    private Ward ward;

    @NotNull
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String website;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String service;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String timetable;

    @NotNull
    @Column(columnDefinition = "TEXT")
    private String rule;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    private LocalDateTime createdDate;

    private LocalDateTime lastEditedDate;

    private Boolean active;

    private Boolean verify;

    private Boolean closed;

    @JsonIgnore
    @OneToMany(mappedBy = "fishingLocation", cascade = CascadeType.ALL)
    private List<CheckIn> checkInList;

    @JsonIgnore
    @OneToMany(mappedBy = "fishingLocation", cascade = CascadeType.ALL)
    private List<Post> postList;

    @JsonIgnore
    @ManyToOne
    @JoinColumn
    private User owner;

    @JsonIgnore
    @OneToMany
    @JoinTable(name = "tbl_employee_list", joinColumns = @JoinColumn(name = "fishing_location_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id"))
    private List<User> employeeList;

    @JsonIgnore
    @OneToMany(mappedBy = "fishingLocation")
    private List<Review> reviewList;

    @JsonIgnore
    @OneToMany(mappedBy = "fishingLocation", cascade = CascadeType.ALL)
    private List<Lake> lakeList;

    @JsonIgnore
    @OneToMany(mappedBy = "fishingLocation")
    private List<Catches> catchesList;

    private Float score;
}
