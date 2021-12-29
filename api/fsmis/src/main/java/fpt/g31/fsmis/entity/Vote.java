package fpt.g31.fsmis.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_vote")
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;

    private VoteType voteType;

    @ManyToOne
    @JoinColumn
    private Review review;

    @ManyToOne
    @JoinColumn
    private User user;
}
