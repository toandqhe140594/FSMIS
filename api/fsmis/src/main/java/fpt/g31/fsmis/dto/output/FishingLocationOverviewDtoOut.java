package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FishingLocationOverviewDtoOut {
    private Long id;
    private String name;
    private String lastEditedDate;
    private String website;
    private Float longitude;
    private Float latitude;
    private String address;
    private AddressFromWardDtoOut addressFromWard;
    private String phone;
    private String description;
    private String service;
    private String timetable;
    private Boolean closed;
    private String rule;
    private List<String> image;
    private Boolean verify;
    private Boolean saved;
    private Boolean active;
    private String role;
    private Boolean pending;
}
