package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LakeWithFishInLakeDtoOut {
    private Long id;
    private String name;
    private List<FishDtoOut> fishDtoOutList;
}
