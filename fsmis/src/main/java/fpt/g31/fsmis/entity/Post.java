package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
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

    private String content;

    private LocalDateTime postTime;

    private PostType postType;

    private Boolean edited;

    private Boolean active;
    
    //    image or video
    private String url;

    @ManyToOne
    private FishingLocation fishingLocation;
}
