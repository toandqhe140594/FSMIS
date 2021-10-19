package fpt.g31.fsmis.dto.output;

import lombok.*;
import java.time.LocalDateTime;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthTokenDtoOut {

    @NotEmpty
    private String authToken;

    @NotEmpty
    private Long id;

    @NotEmpty
    private String fullName;

    @NotEmpty
    private String phone;

    @NotNull
    private LocalDateTime dob;

    @NotNull
    private String qrString;

    @NotNull
    private String avatarUrl;

    private boolean gender;

    private boolean status;

    @NotEmpty
    private String roles;
}
