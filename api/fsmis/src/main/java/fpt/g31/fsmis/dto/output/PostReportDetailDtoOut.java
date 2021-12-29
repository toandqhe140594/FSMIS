package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostReportDetailDtoOut {
    private Long locationId;
    private String locationName;
    private String reportTime;
    private PostDtoOut postDtoOut;
    private List<ReportDetailItemDtoOut> reportDetailList;
}
