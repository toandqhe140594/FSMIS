package fpt.g31.fsmis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FishingLocationDtoInput {
    @NotEmpty
    private String name;

    @NotEmpty
    private String phone;

    private String website;

    @NotEmpty
    private String address;
    
//    @NotNull
//    private Long wardId;

    @NotNull
    private Float longitude;

    @NotNull
    private Float latitude;

    @NotEmpty
    private String description;

    @NotEmpty
    private String timetable;

    @NotEmpty
    private String service;

    @NotEmpty
    private String rule;

    @NotNull
    private Long ownerId;
}
