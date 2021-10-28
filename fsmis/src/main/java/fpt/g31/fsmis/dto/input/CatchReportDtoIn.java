package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CatchReportDtoIn {
    private String imageUrl;
    private String description;
    @NotNull
    private Long lakeId;
    @NotEmpty
    private List<CatchesDetailDtoIn> catchesDetailList;
    @NotNull
    private boolean hidden;
}
