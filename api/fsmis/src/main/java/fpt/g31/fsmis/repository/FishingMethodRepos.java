package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishingMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishingMethodRepos extends JpaRepository<FishingMethod, Long> {
    List<FishingMethod> findAllByActiveIsTrueOrderByNameAsc();

    boolean existsByNameIgnoreCase(String name);

    List<FishingMethod> findAllByOrderByNameAsc();
}
