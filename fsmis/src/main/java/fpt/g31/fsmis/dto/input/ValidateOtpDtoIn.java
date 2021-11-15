package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateOtpDtoIn {
    @NotEmpty
    private String phone;
    @NotEmpty
    private String otp;
}
