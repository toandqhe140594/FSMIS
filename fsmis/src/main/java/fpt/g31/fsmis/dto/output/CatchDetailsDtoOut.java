package fpt.g31.fsmis.dto.output;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatchDetailsDtoOut{

    private Long id;

    private String description;

    private List<String> images;

    private String time;

    private FishingLocationIdNameDtoOut fishingLocation;

    private List<CatchesFishDtoOut> fishes;
}
