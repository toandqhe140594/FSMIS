package fpt.g31.fsmis.dto.output;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LakeDtoOut {

    private Long id;
    private String name;
    private Float length;
    private Float width;
    private Float depth;
    private LocalDateTime lastEditTime;
    private String price;
    private String imageUrl;
    private List<FishDtoOut> fishInLake;
}
