package fpt.g31.fsmis.entity.distancematrix;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DistanceJsonResult {
    private Distance distance;
    private Duration duration;
    private String status;
}
