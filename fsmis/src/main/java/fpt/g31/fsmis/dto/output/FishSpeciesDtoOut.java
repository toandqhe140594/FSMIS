package fpt.g31.fsmis.dto.output;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Setter
@Getter
public class FishSpeciesDtoOut {
    private Long id;
    private String name;
    private String image;
}
