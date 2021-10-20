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

    private Long userId;

    private String userFullName;

    private String avatar;

    private Long locationId;
    
    private String locationName;

    private Long catchId;

    private String description;

    private List<String> images;

    private String time;
}