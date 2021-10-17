package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishSpecies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishSpeciesRepos extends JpaRepository<FishSpecies, Long> {
}
