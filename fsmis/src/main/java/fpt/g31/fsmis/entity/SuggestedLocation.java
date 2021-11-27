package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_suggested_location")
public class SuggestedLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String phone;
    private String website;
    private String address;
    private Float longitude;
    private Float latitude;
    @Column(columnDefinition = "TEXT")
    private String additionalInformation;
    private String senderPhone;
    @Column(columnDefinition = "bool default false")
    private Boolean helpful;
}
