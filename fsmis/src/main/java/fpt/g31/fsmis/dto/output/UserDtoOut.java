package fpt.g31.fsmis.dto.output;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoOut {
    private String fullName;
    private String phone;
    private LocalDateTime dob;
    private String address;
    private AddressFromWardDtoOut addressFromWard;
    private String avatarUrl;
    private boolean gender;
    private boolean active;
}
