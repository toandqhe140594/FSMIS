package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDtoIn {

    @NotEmpty
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
