package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminFishingLocationDtoIn {
    @NotEmpty
    private String name;

    @Pattern(regexp = "^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$", message = "Số điện thoại không hợp lệ")
    private String phone;

    private String website;

    private String address;

    private Long wardId;

    private Float longitude;

    private Float latitude;

    private String description;

    private String timetable;

    private String service;

    private String rule;

    private List<String> images;
}
