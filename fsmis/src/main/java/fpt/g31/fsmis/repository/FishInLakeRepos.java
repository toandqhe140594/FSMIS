package fpt.g31.fsmis.repository;

import fpt.g31.fsmis.entity.FishInLake;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FishInLakeRepos extends JpaRepository<FishInLake, Long> {

    List<FishInLake> findByLakeIdAndActiveIsTrue(Long lakeId);


    Boolean existsByFishSpeciesIdAndMinWeightAndMaxWeightAndLakeIdAndActiveIsTrue(Long fishSpeciesId, Float minWeight, Float maxWeight, Long lakeId);
}
