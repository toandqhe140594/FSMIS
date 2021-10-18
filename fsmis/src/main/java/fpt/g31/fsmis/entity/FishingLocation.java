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
    @JoinTable(name = "tbl_employee_list", joinColumns = @JoinColumn(name = "fishing_location_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id"))
    private List<User> employeeList;

    @JsonIgnore
    @OneToMany(mappedBy = "id")
    private List<Review> reviewList;

    @JsonIgnore
    @OneToMany(mappedBy = "id")
    private List<Lake> lakeList;

    @JsonIgnore
    @OneToMany(mappedBy = "id")
    private List<Catches> catchesList;
}
