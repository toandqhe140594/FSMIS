package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StaffDtoIn {
    @Length(min = 10, max = 11, message = "Tài khoản không tồn tại")
    private String phone;

    private Long userId;
}
