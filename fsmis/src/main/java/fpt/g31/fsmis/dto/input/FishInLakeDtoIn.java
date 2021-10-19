package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FishInLakeDtoIn {

    @NotNull
    private Long fishSpeciesId;

    @NotNull
    private Float maxWeight;

    @NotNull
    private Float minWeight;

    private Integer quantity;

    private Float totalWeight;
}
