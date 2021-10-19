package fpt.g31.fsmis.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LakeOverviewDtoOut {
    private Long id;
    private String name;
    private String image;
    private List<String> fishList;
}
