package fpt.g31.fsmis.dto.output;

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

    private String phone;

    private String dob;

    private boolean gender;

    private String address;

    private String qrString;

    private String avatarUrl;

    private boolean available;

    private AddressFromWardDtoOut addressFromWard;

    private long catchesCount;
}
