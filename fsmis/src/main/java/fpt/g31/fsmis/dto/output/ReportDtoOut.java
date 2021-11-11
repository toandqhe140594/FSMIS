package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportDtoOut {
    private Long id;
    private String time;
    private boolean active;
    private String name;
    private String avatar;
    private String postType;
}
