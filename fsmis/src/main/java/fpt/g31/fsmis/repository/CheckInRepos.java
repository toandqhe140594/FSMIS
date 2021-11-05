package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.CheckIn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckInRepos extends JpaRepository<CheckIn, Long> {

    Page<CheckIn> findFirstByUserIdOrderByCheckInTimeDesc(Long id, Pageable pageable);

    CheckIn findFirstByUserIdOrderByCheckInTimeDesc(Long userId);

    boolean existsByUserIdAndFishingLocationIdAndCheckOutTimeIsNull(Long userId, Long fishingLocationId);
}
