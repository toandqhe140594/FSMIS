package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhoneDtoIn {
    @NotEmpty
    @Length(min = 10, max = 10, message = "Độ dài số điện thoại phải bằng 10")
    @Pattern(regexp = "[0-9]+", message = "Số điện thoại chỉ bao gồm kí tự số")
    private String phone;
}
