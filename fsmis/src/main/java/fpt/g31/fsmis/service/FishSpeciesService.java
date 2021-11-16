package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.FishSpeciesDtoOut;
import fpt.g31.fsmis.entity.FishSpecies;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.FishSpeciesRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FishSpeciesService {
    FishSpeciesRepos fishSpeciesRepos;

    public List<FishSpeciesDtoOut> getAll(Boolean withImage) {
        List<FishSpecies> fishSpeciesList = fishSpeciesRepos.findAllByActiveIsTrue();
        List<FishSpeciesDtoOut> fishSpeciesDtoOuts = new ArrayList<>();
        for (FishSpecies fishSpecies :
                fishSpeciesList) {
            FishSpeciesDtoOut fishSpeciesDtoOut = FishSpeciesDtoOut.builder()
                    .id(fishSpecies.getId())
                    .name(fishSpecies.getName())
                    .build();
            if (Boolean.TRUE.equals(withImage)){
                fishSpeciesDtoOut.setImage(fishSpecies.getImageUrl());
            }
            fishSpeciesDtoOuts.add(fishSpeciesDtoOut);
        }
        return fishSpeciesDtoOuts;
    }

    public FishSpecies getById(Long speciesId) {
        Optional<FishSpecies> fishSpeciesOptional = fishSpeciesRepos.findById(speciesId);
        if (!fishSpeciesOptional.isPresent()) {
            throw new NotFoundException("Không tìm thấy loài cá theo id này!");
        }
        return fishSpeciesOptional.get();
    }
}
