package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDetailItemDtoOut {
    private Long reportDetailId;
    private String description;
    private String time;
    private String userFullName;
    private String userAvatar;
}
