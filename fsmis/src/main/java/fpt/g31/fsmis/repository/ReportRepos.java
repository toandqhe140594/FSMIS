package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepos extends JpaRepository<Report, Long> {
    Optional<Report> findByFishingLocationIdAndActiveIsTrue(Long locationId);

    boolean existsByFishingLocationIdAndActiveIsTrue(Long locationId);

    Optional<Report> findByReviewIdAndActiveIsTrue(Long reviewId);

    Optional<Report> findByPostIdAndActiveIsTrue(Long postId);

    Optional<Report> findByCatchesIdAndActiveIsTrue(Long catchId);

    Page<Report> findAllByFishingLocationIdNotNull(Pageable pageable);

    Page<Report> findAllByReviewIdNotNull(Pageable pageable);

    Page<Report> findAllByPostIdNotNull(Pageable pageable);

    Page<Report> findAllByCatchesIdNotNull(Pageable pageable);
}
