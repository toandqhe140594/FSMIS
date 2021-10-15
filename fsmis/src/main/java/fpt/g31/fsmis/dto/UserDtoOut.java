package fpt.g31.fsmis.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoOut {
    private String fullName;
    private String phone;
    private LocalDateTime dob;
    private String address;
    private String ward;
    private Long wardId;
    private String district;
    private Long districtId;
    private String province;
    private Long provinceId;
    private String avatarUrl;
    private boolean gender;
    private boolean active;
}
