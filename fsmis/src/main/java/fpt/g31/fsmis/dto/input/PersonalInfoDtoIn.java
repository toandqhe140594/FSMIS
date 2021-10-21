package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfoDtoIn {

    private String avatarUrl;

    private String fullName;

    private String dob;

    private Boolean gender;

    private String address;

    private long wardId;
}
