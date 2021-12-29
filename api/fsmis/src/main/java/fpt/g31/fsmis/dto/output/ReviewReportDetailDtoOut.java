package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewReportDetailDtoOut {
    private Long locationId;
    private String locationName;
    private String reportTime;
    private ReviewDtoOut reviewDtoOut;
    private List<ReportDetailItemDtoOut> reportDetailList;
}
