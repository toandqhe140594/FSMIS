package fpt.g31.fsmis.dto.output;

import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatchesDetailDtoOut{

    private Long userId;
    
    private String userFullName;

    private String avatar;

    private Long locationId;
    
    private String locationName;

    private Long catchId;

    private String description;

    private List<String> images;

    private String time;

    private List<CatchesFishDtoOut> fishes;
}
