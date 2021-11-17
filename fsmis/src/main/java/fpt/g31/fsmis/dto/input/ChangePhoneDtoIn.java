package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePhoneDtoIn {
    private String newPhone;
    private String password;
}
