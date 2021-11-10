package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepos extends JpaRepository<Report, Long> {
    Optional<Report> findByFishingLocationId(Long locationId);

    boolean existsByFishingLocationIdAndActiveIsTrue(Long locationId);

    Optional<Report> findByReviewId(Long reviewId);

    Optional<Report> findByPostId(Long postId);

    Optional<Report> findByCatchesId(Long catchId);
}
