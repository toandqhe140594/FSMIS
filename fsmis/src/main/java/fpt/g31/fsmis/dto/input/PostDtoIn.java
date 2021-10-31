package fpt.g31.fsmis.dto.input;

import fpt.g31.fsmis.entity.AttachmentType;
import fpt.g31.fsmis.entity.PostType;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDtoIn {
    private Long id;

    @NotNull
    private PostType postType;

    @NotEmpty
    private String content;

    @NotNull
    private AttachmentType attachmentType;

    private String url;
}
