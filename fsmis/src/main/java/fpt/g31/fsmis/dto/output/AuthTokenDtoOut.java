package fpt.g31.fsmis.dto.output;

import lombok.*;

import javax.validation.constraints.NotEmpty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthTokenDtoOut {

    @NotEmpty
    private String authToken;

    @NotEmpty
    private String phone;

    @NotEmpty
    private String roles;
}
