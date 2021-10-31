package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FishingLocationDtoIn {
    @NotEmpty
    private String name;

    @NotEmpty
    private String phone;

    private String website;

    @NotEmpty
    private String address;
    
    @NotNull
    private Long wardId;

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

    @NotEmpty
    private List<String> images;
}
