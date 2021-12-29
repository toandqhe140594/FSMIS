package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FishingLocationPinDtoOut {
    private Long id;
    private String name;
    private Boolean verify;
    private Float score;
    private Float longitude;
    private Float latitude;
    private Float distance;
}
