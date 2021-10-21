package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.CheckIn;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckInRepos extends JpaRepository<CheckIn, Long> {

    Page<CheckIn> findByUserIdOrderByCheckInTimeDesc(Long id, Pageable pageable);
}
