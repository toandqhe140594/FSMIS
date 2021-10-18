package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FishingLocationDtoOut {
    private Long id;
    private String name;
    private Float longitude;
    private Float latitude;
    private String address;
    private AddressFromWardDtoOut addressFromWard;
    private String phone;
    private String description;
    private String service;
    private String timetable;
    private String rule;
    private String website;
    private String lastEditedDate;
    private boolean active;
    private boolean verify;
}
