package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDtoIn {
    @Pattern(regexp = "^(0|\\+84)(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$")
    private String phone;

    @NotEmpty
    private String password;

    @NotEmpty
    private String fullName;

    @NotNull
    private LocalDateTime dob;

    @NotNull
    private Boolean gender;

    @NotEmpty
    private String address;

    @NotNull
    private Long wardId;
}
