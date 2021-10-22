package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepos extends JpaRepository<Review, Long> {

    @Query(nativeQuery = true,
            value = "SELECT AVG(score) FROM tbl_review WHERE fishing_location_id = ?1 AND active = 'true'"
    )
    Double getAverageScoreByFishingLocationIdAndActiveIsTrue(Long id);

    Integer countByFishingLocationIdAndActiveIsTrue(Long id);

    Review findByFishingLocationIdAndUserIdAndActiveIsTrue(Long locationId, Long userId);

    Page<Review> findByFishingLocationIdAndActiveIsTrueOrderByTimeDesc(Long id, Pageable pageable);

    Page<Review> findByFishingLocationIdAndActiveIsTrueOrderByScoreDesc(Long id, Pageable pageable);

    Page<Review> findByFishingLocationIdAndActiveIsTrueOrderByScoreAsc(Long id, Pageable pageable);
}
