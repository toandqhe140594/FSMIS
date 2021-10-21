package fpt.g31.fsmis.dto.output;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonalInfoDtoOut {

    private Long id;

    private String fullName;

    private LocalDateTime dob;

    private boolean gender;

    private String address;

    private AddressFromWardDtoOut addressFromWard;
}
