package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishSpecies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishSpeciesRepos extends JpaRepository<FishSpecies, Long> {
    List<FishSpecies> findAllByActiveIsTrue();

    boolean existsByNameIgnoreCase(String name);

    FishSpecies findByNameIgnoreCase(String name);
}
