package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Catches;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatchesRepos extends JpaRepository<Catches, Long> {

    Page<Catches> findByUserId(Long id, Pageable pageable);

    Page<Catches> findByFishingLocationIdAndHiddenIsFalseOrderByTimeDesc(Long id, Pageable pageable);

    Page<Catches> findByFishingLocationIdAndApprovedIsFalseOrderByTimeDesc(Long locationId, Pageable pageable);

    long countByUserId(Long userId);
}
