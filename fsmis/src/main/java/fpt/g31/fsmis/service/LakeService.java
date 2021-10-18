package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.FishInLakeDtoIn;
import fpt.g31.fsmis.dto.input.LakeDtoIn;
import fpt.g31.fsmis.entity.FishInLake;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.Lake;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.FishInLakeRepos;
import fpt.g31.fsmis.repository.FishSpeciesRepos;
import fpt.g31.fsmis.repository.FishingLocationRepos;
import fpt.g31.fsmis.repository.LakeRepos;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LakeService {
    private LakeRepos lakeRepos;
    private FishingLocationRepos fishingLocationRepos;
    private FishSpeciesRepos fishSpeciesRepos;
    private ModelMapper modelMapper;
    private FishInLakeRepos fishInLakeRepos;

    public String createLake(LakeDtoIn lakeDtoIn, Long fishingLocationId) {
        Optional<FishingLocation> fishingLocationOptional = fishingLocationRepos.findById(fishingLocationId);
        if (!fishingLocationOptional.isPresent()) {
            throw new NotFoundException("Không tìm thấy hồ câu!");
        }
        FishingLocation fishingLocation = fishingLocationOptional.get();
        if (!fishingLocation.getOwner().getId().equals(lakeDtoIn.getOwnerId())) {
            throw new ValidationException("Không phải chủ hồ, không có quyền tạo hồ con!");
        }
        int row = 0;
        for (FishInLakeDtoIn fishInLakeDtoIn : lakeDtoIn.getFishInLakeList()) {
            row++;
//            FishSpecies fishSpecies = fishSpeciesRepos.findById(fishInLakeDtoIn.getFishSpeciesId())
//                    .orElseThrow(() -> new NotFoundException("Không tìm thấy loài cá này!"));
            if (!fishSpeciesRepos.existsById(fishInLakeDtoIn.getFishSpeciesId())) {
                throw new NotFoundException("Không tìm thấy loài cá này!, dòng " + row);
            }
            if (fishInLakeDtoIn.getMinWeight() > fishInLakeDtoIn.getMaxWeight()) {
                throw new ValidationException("Biểu không hợp lý, dòng " + row);
            }
            if (fishInLakeDtoIn.getQuantity() == null && fishInLakeDtoIn.getTotalWeight() == null) {
                throw new ValidationException("Cần điền thông tin về số lượng hoặc tổng khối lượng cá, dòng " + row);
            }
//            if user fill both quantity and total weight field, check if total weight is between
//            min weight * quantity and max weight * quantity
            if (fishInLakeDtoIn.getQuantity() != null && fishInLakeDtoIn.getTotalWeight() != null
                    && (fishInLakeDtoIn.getTotalWeight() < fishInLakeDtoIn.getMinWeight() * fishInLakeDtoIn.getQuantity()
                    || fishInLakeDtoIn.getTotalWeight() > fishInLakeDtoIn.getMaxWeight() * fishInLakeDtoIn.getQuantity())) {
                throw new ValidationException("Tương quan khối lượng và số lượng không hợp lệ, dòng " + row);
            }
        }
        Lake lake = modelMapper.map(lakeDtoIn, Lake.class);
        lake.setActive(true);
        lake.setLastEditTime(LocalDateTime.now());
        lake.setFishingLocation(fishingLocation);
        lakeRepos.save(lake);
        for (FishInLakeDtoIn fishInLakeDtoIn : lakeDtoIn.getFishInLakeList()) {
            FishInLake fishInLake = modelMapper.map(fishInLakeDtoIn, FishInLake.class);
            fishInLake.setFishSpecies(fishSpeciesRepos.getById(fishInLakeDtoIn.getFishSpeciesId()));
            fishInLake.setLake(lake);
            fishInLakeRepos.save(fishInLake);
        }
        return "Tạo hồ con thành công!";
    }
}
