package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishingLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishingLocationRepos extends JpaRepository<FishingLocation, Long> {

}
