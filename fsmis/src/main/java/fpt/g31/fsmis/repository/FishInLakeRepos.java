package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishInLake;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FishInLakeRepos extends JpaRepository<FishInLake, Long> {

    List<FishInLake> findByLakeId(Long lakeId);
}
