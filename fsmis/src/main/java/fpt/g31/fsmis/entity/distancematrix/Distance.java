package fpt.g31.fsmis.entity.distancematrix;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Distance {
    private String text;
    private Long value;
}
