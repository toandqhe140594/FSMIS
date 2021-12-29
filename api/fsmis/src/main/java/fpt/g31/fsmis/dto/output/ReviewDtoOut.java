package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDtoOut {

    private Long id;

    private Long userId;

    private String userFullName;

    private String userAvatar;

    private Boolean userVoteType;

    private Integer score;

    private String description;

    private String time;

    private Long upvote;

    private Long downvote;
}
