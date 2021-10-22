package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Vote;
import fpt.g31.fsmis.entity.VoteType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepos extends JpaRepository<Vote, Long> {

    Vote findByReviewIdAndUserId(Long reviewId, Long userId);

    @Query(nativeQuery = true,
            value = "SELECT COUNT(*) FROM tbl_vote WHERE review_id = ?1 AND vote_type = ?2")
    Long getVoteCountByReviewId(Long id, int voteType);


}
