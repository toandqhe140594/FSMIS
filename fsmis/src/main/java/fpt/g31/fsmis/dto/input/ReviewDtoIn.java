package fpt.g31.fsmis.dto.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDtoIn {
    private Integer score;
    private String description;
}
