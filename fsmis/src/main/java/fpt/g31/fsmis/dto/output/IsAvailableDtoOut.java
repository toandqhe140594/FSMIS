package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IsAvailableDtoOut {
    private Boolean available;
    private FishingLocationItemDtoOut fishingLocationItemDtoOut;
}
