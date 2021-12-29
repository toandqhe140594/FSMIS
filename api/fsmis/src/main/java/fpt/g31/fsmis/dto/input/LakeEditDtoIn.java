package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LakeEditDtoIn {
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
    @NotEmpty
    private Long[] methods;
}
