package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CaughtFishDtoOut {

    private String name;

    private String image;

    private Integer quantity;

    private Float weight;

    private Boolean returnToOwner;
}
