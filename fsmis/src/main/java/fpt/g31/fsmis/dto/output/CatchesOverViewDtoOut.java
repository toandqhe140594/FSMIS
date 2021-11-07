package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CatchesOverViewDtoOut {

    private Long id;

    private Long userId;

    private String userFullName;

    private String avatar;

    private Long locationId;

    private String locationName;

    private String description;

    private List<String> images;

    private String time;

    private List<String> fishes;
}
