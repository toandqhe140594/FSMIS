package fpt.g31.fsmis.dto.output;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatchesDetailDtoOut {

    private Long id;

    private Long userId;

    private String userFullName;

    private String avatar;

    private Long locationId;

    private String locationName;

    private String lakeName;

    private String description;

    private List<String> images;

    private String time;

    private List<CaughtFishDtoOut> fishes;

    private Boolean approved;
}
