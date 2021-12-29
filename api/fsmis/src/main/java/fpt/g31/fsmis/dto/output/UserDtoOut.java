package fpt.g31.fsmis.dto.output;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDtoOut {
    private Long id;
    private String fullName;
    private String phone;
    private String dob;
    private String address;
    private String avatar;
    private Boolean gender;
    private Boolean active;
}
