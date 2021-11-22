package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FishingLocationDtoIn {
    @NotEmpty
    private String name;

    @Pattern(regexp = "^(0|\\+84)(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$", message = "Số điện thoại không hợp lệ")
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
