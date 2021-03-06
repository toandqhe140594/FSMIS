package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CatchDetailDtoIn {
    @NotNull
    private Integer quantity;
    @NotNull
    private Float weight;
    @NotNull
    private Long fishSpeciesId;
    @NotNull
    private Long fishInLakeId;
    @NotNull
    private Boolean returnToOwner;
}
