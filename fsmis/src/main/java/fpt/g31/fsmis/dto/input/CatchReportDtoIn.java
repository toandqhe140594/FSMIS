package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CatchReportDtoIn {
    private List<String> images;
    private String description;
    @NotNull
    private Long lakeId;
    @NotEmpty
    @Valid
    private List<CatchDetailDtoIn> catchesDetailList;
    @NotNull
    private boolean hidden;
}
