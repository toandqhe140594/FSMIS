package fpt.g31.fsmis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoIn {
    @NotEmpty
    private String fullName;

    @NotEmpty
    private String password;

    @NotEmpty
    @Length(min = 10, max = 10)
    private String phone;

    @NotNull
    private LocalDateTime dob;

    @NotEmpty
    private String address;

    @NotNull
    private long wardId;

    private String avatarUrl;

    @NotNull
    private boolean gender;
}
