package fpt.g31.fsmis.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FishingSpotDto {
    private String name;
    private Float longitude;
    private Float latitude;
    private String address;
}
