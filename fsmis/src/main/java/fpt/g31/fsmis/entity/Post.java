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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;

    @NotNull
    private LocalDateTime postTime;

    @NotNull
    private PostType postType;

    private boolean edited;

    private boolean active;
    
    @Column(columnDefinition = "TEXT")
    private String url;

    @ManyToOne
    private FishingLocation fishingLocation;
}
