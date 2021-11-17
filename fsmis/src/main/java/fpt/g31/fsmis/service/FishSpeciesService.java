package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.SpeciesDtoIn;
import fpt.g31.fsmis.dto.output.FishSpeciesDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.entity.FishSpecies;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.FishSpeciesRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FishSpeciesService {
    FishSpeciesRepos fishSpeciesRepos;

    public List<FishSpeciesDtoOut> getAll(Boolean withImage, Boolean isActiveOnly) {
        List<FishSpecies> fishSpeciesList;
        if (Boolean.TRUE.equals(isActiveOnly)) {
            fishSpeciesList = fishSpeciesRepos.findAllByActiveIsTrue();
        } else {
            fishSpeciesList = fishSpeciesRepos.findAll();
        }
        List<FishSpeciesDtoOut> fishSpeciesDtoOuts = new ArrayList<>();
        for (FishSpecies fishSpecies :
                fishSpeciesList) {
            FishSpeciesDtoOut fishSpeciesDtoOut = FishSpeciesDtoOut.builder()
                    .id(fishSpecies.getId())
                    .name(fishSpecies.getName())
                    .active(fishSpecies.getActive())
                    .build();
            if (Boolean.TRUE.equals(withImage)) {
                fishSpeciesDtoOut.setImage(fishSpecies.getImageUrl());
            }
            fishSpeciesDtoOuts.add(fishSpeciesDtoOut);
        }
        return fishSpeciesDtoOuts;
    }

    public FishSpecies getById(Long speciesId) {
        Optional<FishSpecies> fishSpeciesOptional = fishSpeciesRepos.findById(speciesId);
        if (!fishSpeciesOptional.isPresent()) {
            throw new NotFoundException("Không tìm thấy loài cá theo id này");
        }
        return fishSpeciesOptional.get();
    }

    public ResponseTextDtoOut addSpecies(SpeciesDtoIn speciesDtoIn) {
        if (fishSpeciesRepos.existsByNameIgnoreCase(speciesDtoIn.getName())) {
            throw new ValidationException("Đã tồn tại loài cá với tên này");
        }
        FishSpecies fishSpecies = FishSpecies.builder()
                .name(speciesDtoIn.getName())
                .imageUrl(speciesDtoIn.getImage())
                .active(true)
                .build();
        fishSpeciesRepos.save(fishSpecies);
        return new ResponseTextDtoOut("Thêm thông tin loài cá thành công");
    }

    public ResponseTextDtoOut editSpecies(SpeciesDtoIn speciesDtoIn, Long speciesId) {
        FishSpecies species = fishSpeciesRepos.findById(speciesId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy loài cá theo id này"));
        if (fishSpeciesRepos.existsByNameIgnoreCase(speciesDtoIn.getName())) {
            FishSpecies existedSpecies = fishSpeciesRepos.findByNameIgnoreCase(speciesDtoIn.getName());
            if (!existedSpecies.getId().equals(speciesId)) {
                throw new ValidationException("Đã tồn tại loài cá với tên này");
            }
        }
        species.setName(speciesDtoIn.getName());
        species.setImageUrl(speciesDtoIn.getImage());
        fishSpeciesRepos.save(species);
        return new ResponseTextDtoOut("Sửa thông tin loài cá thành công");
    }

    public ResponseTextDtoOut changeSpeciesActive(Long speciesId) {
        FishSpecies species = fishSpeciesRepos.findById(speciesId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy loại hình câu"));
        species.setActive(!species.getActive());
        fishSpeciesRepos.save(species);
        if (Boolean.TRUE.equals(species.getActive())) {
            return new ResponseTextDtoOut("Hiện loài cá thành công");
        } else {
            return new ResponseTextDtoOut("Ẩn loài cá thành công");
        }
    }
}
