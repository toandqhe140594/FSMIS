package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SuggestedLocationDtoIn {
    @NotEmpty
    private String phone;
    @NotEmpty
    private String name;
    private String description;
}
