package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SuggestedLocationDtoOut {
    private Long id;
    private String phone;
    private String name;
    private String website;
    private String address;
    private Float longitude;
    private Float latitude;
    private String additionalInformation;
    private String senderPhone;
    private Boolean helpful;
}
