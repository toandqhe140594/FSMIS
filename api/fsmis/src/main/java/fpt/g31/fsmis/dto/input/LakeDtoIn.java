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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LakeDtoIn {
    @NotEmpty
    private String name;
    @NotNull
    private Float length;
    @NotNull
    private Float width;
    @NotNull
    private Float depth;
    @NotEmpty
    private String price;
    @NotEmpty
    private String imageUrl;
    @NotNull
    @Valid
    private List<FishInLakeDtoIn> fishInLakeList;
    @NotNull
    private Long[] methods;
}
