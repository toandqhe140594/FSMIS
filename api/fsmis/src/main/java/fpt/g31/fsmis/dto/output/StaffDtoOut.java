package fpt.g31.fsmis.dto.output;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Builder
public class StaffDtoOut {
    private Long id;
    private String name;
    private String avatar;
    private String phone;
}
