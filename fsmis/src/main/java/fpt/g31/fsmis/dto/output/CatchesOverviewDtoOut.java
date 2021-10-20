package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CatchesOverviewDtoOut {

    private Long id;

    private String description;

    private List<String> images;

    private String time;

    private FishingLocationIdNameDtoOut fishingLocation;
}