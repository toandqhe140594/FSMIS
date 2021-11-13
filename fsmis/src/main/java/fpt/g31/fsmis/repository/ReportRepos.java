package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportRepos extends JpaRepository<Report, Long> {
    Optional<Report> findByFishingLocationIdAndActiveIsTrue(Long locationId);

    Optional<Report> findByReviewIdAndActiveIsTrue(Long reviewId);

    Optional<Report> findByPostIdAndActiveIsTrue(Long postId);

    Optional<Report> findByCatchesIdAndActiveIsTrue(Long catchId);

    Page<Report> findAllByFishingLocationIdNotNullOrderByActiveDescTimeDesc(Pageable pageable);

    Page<Report> findAllByReviewIdNotNullOrderByActiveDescTimeDesc(Pageable pageable);

    Page<Report> findAllByPostIdNotNullOrderByActiveDescTimeDesc(Pageable pageable);

    Page<Report> findAllByCatchesIdNotNullOrderByActiveDescTimeDesc(Pageable pageable);
}
