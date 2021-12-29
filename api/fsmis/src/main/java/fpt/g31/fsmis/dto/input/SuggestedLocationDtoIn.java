package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SuggestedLocationDtoIn {
    @Pattern(regexp = "^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$")
    private String phone;
    @NotEmpty
    private String name;
    private String website;
    private String address;
    private Float longitude;
    private Float latitude;
    private String additionalInformation;
    @Pattern(regexp = "^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7}$")
    private String senderPhone;
}
