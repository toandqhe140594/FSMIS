package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.Lake;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LakeRepos extends JpaRepository<Lake, Long> {
    List<Lake> findByFishingLocationId(Long id);
}
