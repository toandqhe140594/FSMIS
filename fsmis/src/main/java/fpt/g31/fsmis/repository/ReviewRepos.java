package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepos extends JpaRepository<Review, Long> {

    @Query(
            nativeQuery = true,
            value = "SELECT AVG(score) FROM tbl_review WHERE fishing_location_id = ?1"
    )
    Float getAverageScoreByFishingLocationId(Long id);
}
