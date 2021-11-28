package fpt.g31.fsmis.entity.distancematrix;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BingDistanceJsonResult {
    private Float travelDistance;
    private Integer destinationIndex;
    private Integer originIndex;
    private Float totalWalkDuration;
    private Float travelDuration;
}
