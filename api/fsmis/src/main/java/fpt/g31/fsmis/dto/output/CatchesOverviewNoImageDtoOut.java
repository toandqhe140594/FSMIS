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
public class CatchesOverviewNoImageDtoOut {

    private Long id;

    private Long userId;

    private String userFullName;

    private String avatar;

    private Long locationId;

    private String locationName;

    private String description;

    private String time;

    private List<String> fishes;

    private Boolean approved;

    private String approverName;
}