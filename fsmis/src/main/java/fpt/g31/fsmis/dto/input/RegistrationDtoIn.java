package fpt.g31.fsmis.dto.input;

import lombok.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDtoIn {

    private String phone;

    private String password;

    private String fullName;

    private LocalDateTime dob;

    private Boolean gender;

    private String address;

    private Long wardId;
}
