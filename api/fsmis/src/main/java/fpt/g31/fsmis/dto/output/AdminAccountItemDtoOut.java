package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminAccountItemDtoOut {
    private Long id;
    private String name;
    private String phone;
    private String avatar;
    private Boolean active;
}
