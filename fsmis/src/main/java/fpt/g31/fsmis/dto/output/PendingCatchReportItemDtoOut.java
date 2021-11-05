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
public class PendingCatchReportItemDtoOut {
    private Long id;
    private String avatar;
    private String name;
    private String postTime;
    private String description;
    private List<String> fishList;
}
