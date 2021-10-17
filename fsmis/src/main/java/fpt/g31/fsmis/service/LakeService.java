package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.LakeDtoIn;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.Lake;
import fpt.g31.fsmis.exception.NotFoundException;
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
    private ModelMapper modelMapper;

    public String createLake(LakeDtoIn lakeDtoIn, Long fishingLocationId){
        Optional<FishingLocation> fishingLocationOptional = fishingLocationRepos.findById(fishingLocationId);
        if (!fishingLocationOptional.isPresent()){
            throw new NotFoundException("Không tìm thấy hồ câu!");
        }
        FishingLocation fishingLocation = fishingLocationOptional.get();
        if (!fishingLocation.getOwner().getId().equals(lakeDtoIn.getOwnerId())){
            throw new ValidationException("Không phải chủ hồ, không có quyền tạo hồ con!");
        }
        Lake lake = modelMapper.map(lakeDtoIn, Lake.class);
        lake.setActive(true);
        lake.setLastEditTime(LocalDateTime.now());
        lake.setFishingLocation(fishingLocation);
        return "Tạo hồ con thành công!";
    }
}
