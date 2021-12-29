package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FishDtoOut {

    private Long id;
    private String name;
    private String imageUrl;
    private Float maxWeight;
    private Float minWeight;
    private Integer quantity;
    private Float totalWeight;
    private Long speciesId;
}
