package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressFromWardDtoOut {
    private String ward;
    private Long wardId;
    private String district;
    private Long districtId;
    private String province;
    private Long provinceId;
}
