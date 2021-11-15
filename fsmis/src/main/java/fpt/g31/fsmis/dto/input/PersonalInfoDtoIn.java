package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfoDtoIn {

    @NotEmpty
    private String avatarUrl;

    @NotEmpty
    private String fullName;

    @NotEmpty
    private String dob;

    @NotNull
    private Boolean gender;

    @NotEmpty
    private String address;

    @NotNull
    private Long wardId;
}
