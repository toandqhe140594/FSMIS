package fpt.g31.fsmis.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    private String name;

    @Column(columnDefinition = "varchar(255) default ''")
    private String unsignedName;

    @Column(columnDefinition = "float4 default 0")
    private Float longitude;

    @Column(columnDefinition = "float4 default 0")
    private Float latitude;

    @Column(columnDefinition = "varchar(255) default ''")
    private String address;

    @ManyToOne
    @JoinColumn(columnDefinition = "int8 default 1")
    private Ward ward;

    @NotNull
    @Column(columnDefinition = "varchar(255) default ''")
    private String phone;

    @Column(columnDefinition = "TEXT default ''")
    private String description;

    @Column(columnDefinition = "varchar(255) default ''")
    private String website;

    @Column(columnDefinition = "TEXT default ''")
    private String service;

    @Column(columnDefinition = "TEXT default ''")
    private String timetable;

    @Column(columnDefinition = "TEXT default ''")
    private String rule;

    @Column(columnDefinition = "TEXT default ''")
    private String imageUrl;

    @Column(columnDefinition = "timestamp default now()")
    private LocalDateTime createdDate;

    @Column(columnDefinition = "timestamp default now()")
    private LocalDateTime lastEditedDate;

    @Column(columnDefinition = "bool default true")
    private Boolean active;

    @Column(columnDefinition = "bool default false")
    private Boolean verify;

    @Column(columnDefinition = "bool default false")
    private Boolean closed;

    @Column(columnDefinition = "bool default false")
    private Boolean pending;

    @JsonIgnore
    @OneToMany(mappedBy = "fishingLocation", cascade = CascadeType.ALL)
    private List<CheckIn> checkInList;

    @JsonIgnore
    @OneToMany(mappedBy = "fishingLocation", cascade = CascadeType.ALL)
    private List<Post> postList;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(columnDefinition = "int4 default 1")
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

    @JsonIgnore
    @ManyToMany(mappedBy = "savedFishingLocations")
    private List<User> savedUser;

    @Column(columnDefinition = "float4 default 0")
    private Float score;
}
