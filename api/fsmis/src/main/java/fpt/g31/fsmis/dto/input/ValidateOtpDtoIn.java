package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidateOtpDtoIn {
    @NotEmpty
    @Pattern(regexp = "^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$", message = "Số điện thoại không hợp lệ")
    private String phone;
    @NotEmpty
    private String otp;
}
