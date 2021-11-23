package fpt.g31.fsmis.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DistanceJsonResult {
    private Integer destinationIndex;
    private Integer originIndex;
    private Float totalWalkDuration;
    private Float travelDistance;
    private Float travelDuration;

}
