package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @NotNull
    private LocalDateTime postTime;

    @NotNull
    private PostType postType;

    private Boolean edited;

    private Boolean active;

    private Boolean pinned;
    
    @Column(columnDefinition = "TEXT")
    private String url;

    private AttachmentType attachmentType;

    @ManyToOne
    private FishingLocation fishingLocation;

    private Long posterId;
}
