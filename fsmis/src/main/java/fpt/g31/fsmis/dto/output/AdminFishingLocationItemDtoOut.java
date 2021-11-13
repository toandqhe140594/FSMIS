package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminFishingLocationItemDtoOut {
    private Long id;
    private String name;
    private Double rating;
    private String address;
    private boolean active;
}
