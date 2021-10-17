package fpt.g31.fsmis.service;

import fpt.g31.fsmis.entity.FishSpecies;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.FishSpeciesRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FishSpeciesService {
    FishSpeciesRepos fishSpeciesRepos;

    public List<FishSpecies> getAll(){
        return fishSpeciesRepos.findAll();
    }

    public FishSpecies getById(Long speciesId){
        Optional<FishSpecies> fishSpeciesOptional = fishSpeciesRepos.findById(speciesId);
        if (!fishSpeciesOptional.isPresent()){
            throw new NotFoundException("Không tìm thấy loài cá theo id này!");
        }
        return fishSpeciesOptional.get();
    }
}
