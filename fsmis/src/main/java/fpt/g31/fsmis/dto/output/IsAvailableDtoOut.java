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
    private boolean isAvailable;
    private FishingLocationItemDtoOut fishingLocationItemDtoOut;
}
