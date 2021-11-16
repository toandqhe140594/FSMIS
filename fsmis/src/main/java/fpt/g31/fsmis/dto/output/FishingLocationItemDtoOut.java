package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FishingLocationItemDtoOut {

    private Long id;

    private String name;

    private String image;

    private Boolean verify;

    private Double score;

    private String address;

    private String role;

    private Boolean closed;
}
