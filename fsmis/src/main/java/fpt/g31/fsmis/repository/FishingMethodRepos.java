package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishingMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FishingMethodRepos extends JpaRepository<FishingMethod, Long> {

}
