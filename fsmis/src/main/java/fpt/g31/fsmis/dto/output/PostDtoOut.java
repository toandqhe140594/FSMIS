package fpt.g31.fsmis.dto.output;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDtoOut {
    private Long id;
    private String content;
    private String postTime;
    private String postType;
    private String url;
    private String attachmentType;
    private boolean edited;
    private boolean pinned;
}
