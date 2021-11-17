package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tbl_suggested_location")
public class SuggestedLocation {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String phone;
    private String description;
    private String senderPhone;
}
