package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocationCheckInHistoryDtoOut {
    private Long id;
    private String name;
    private String avatar;
    private String checkInTime;
    private String checkOutTime;
    private String performerName;
}
