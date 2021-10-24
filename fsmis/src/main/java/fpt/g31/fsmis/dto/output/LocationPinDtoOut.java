package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationPinDtoOut {
    private Long id;
    private String name;
    private boolean verify;
    private Double score;
    private Float longitude;
    private Float latitude;
}
