package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FilterDtoIn {
    private List<Long> fishingMethodIdList;
    private List<Long> provinceIdList;
    private List<Long> fishSpeciesIdList;
    private String input;
}
