package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String description;
    private String time;

    @ManyToOne
    @JoinColumn
    private User user;

    @OneToMany(mappedBy = "id")
    private List<Vote> voteList;

    @ManyToOne
    @JoinColumn()
    private FishingSpot fishingSpot;
}
