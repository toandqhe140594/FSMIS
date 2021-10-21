package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckInHistoryPersonalDtoOut {

    private Long id;

    private Long locationId;

    private String locationName;

    private String checkInTime;

    private String checkOutTime;
}
