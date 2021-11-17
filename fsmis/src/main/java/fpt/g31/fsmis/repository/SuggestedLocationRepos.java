package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.SuggestedLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuggestedLocationRepos extends JpaRepository<SuggestedLocation, Long> {
}
