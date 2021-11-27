package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.SuggestedLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SuggestedLocationRepos extends JpaRepository<SuggestedLocation, Long> {
    List<SuggestedLocation> findAllByOrderByIdDesc();
}
