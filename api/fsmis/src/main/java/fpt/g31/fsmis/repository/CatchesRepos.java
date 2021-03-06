package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Catches;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface CatchesRepos extends JpaRepository<Catches, Long> {

    Page<Catches> findByUserIdOrderByTimeDesc(Long id, Pageable pageable);

    Page<Catches> findByFishingLocationIdAndTimeBetweenAndApprovedIsTrueOrderByTimeDesc(Long id, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    Page<Catches> findByFishingLocationIdAndApprovedIsNullOrderByTimeDesc(Long locationId, Pageable pageable);

    long countByUserId(Long userId);

    Page<Catches> findByFishingLocationIdAndHiddenIsFalseAndApprovedIsTrueOrderByTimeDesc(Long locationId, Pageable pageable);
}
