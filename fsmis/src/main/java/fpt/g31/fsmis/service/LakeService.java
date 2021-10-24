package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.LakeOverviewDtoOut;
import fpt.g31.fsmis.dto.input.FishInLakeDtoIn;
import fpt.g31.fsmis.dto.input.LakeDtoIn;
import fpt.g31.fsmis.dto.output.FishDtoOut;
import fpt.g31.fsmis.dto.output.LakeDtoOut;
import fpt.g31.fsmis.entity.FishInLake;
import fpt.g31.fsmis.entity.FishingLocation;
import fpt.g31.fsmis.entity.FishingMethod;
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
import java.util.ArrayList;
import java.util.List;
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

    public LakeDtoOut getLakeById(Long locationId, long lakeId) {
        Lake lake = lakeRepos.getById(lakeId);
        if(lake.getFishingLocation().getId().equals(locationId) && !lake.isActive()) {
            throw new ValidationException("Hồ này không tồn tại");
        }
        List<String> fishingMethodList = new ArrayList<>();
        for(FishingMethod fishingMethod : lake.getFishingMethodSet()) {
            fishingMethodList.add(fishingMethod.getName());
        }

        List<FishInLake> fishesInLake = fishInLakeRepos.findByLakeId(lakeId);
        List<FishDtoOut> fishes = new ArrayList<>();
        for(FishInLake fishInLake : fishesInLake) {
            FishDtoOut fish = FishDtoOut.builder()
                    .id(fishInLake.getFishSpecies().getId())
                    .name(fishInLake.getFishSpecies().getName())
                    .imageUrl(fishInLake.getFishSpecies().getImageUrl())
                    .maxWeight(fishInLake.getMaxWeight())
                    .minWeight(fishInLake.getMinWeight())
                    .quantity(fishInLake.getQuantity())
                    .totalWeight(fishInLake.getTotalWeight())
                    .build();
            fishes.add(fish);
        }

        return LakeDtoOut.builder()
                .id(lake.getId())
                .name(lake.getName())
                .length(lake.getLength())
                .width(lake.getWidth())
                .depth(lake.getDepth())
                .lastEditTime(ServiceUtils.convertDateToString(lake.getLastEditTime()))
                .price(lake.getPrice())
                .imageUrl(lake.getImageUrl())
                .fishingMethodList(fishingMethodList)
                .fishInLake(fishes)
                .build();
    }
  
    public List<LakeOverviewDtoOut> getAllByLocationId(Long locationId) {
        Optional<FishingLocation> fishingLocationOptional = fishingLocationRepos.findById(locationId);
        if (!fishingLocationOptional.isPresent() || Boolean.FALSE.equals(fishingLocationOptional.get().getActive())){
            throw new NotFoundException("Không tìm thấy khu hồ!");
        }
        List<Lake> lakeList = lakeRepos.findByFishingLocationId(locationId);
        List<LakeOverviewDtoOut> lakeOverviewDtoOutList = new ArrayList<>();
        for (Lake lake: lakeList) {
            LakeOverviewDtoOut lakeOverviewDtoOut = modelMapper.map(lake, LakeOverviewDtoOut.class);
            lakeOverviewDtoOut.setImage(lake.getImageUrl());
            List<String> fishingMethodList = new ArrayList<>();
            for(FishingMethod fishingMethod : lake.getFishingMethodSet()) {
                fishingMethodList.add(fishingMethod.getName());
            }
            lakeOverviewDtoOut.setFishingMethodList(fishingMethodList);
            List<String> fishList = new ArrayList<>();
            for (FishInLake fishInLake: fishInLakeRepos.findByLakeId(lake.getId())){
                fishList.add(fishInLake.getFishSpecies().getName());
            }
            lakeOverviewDtoOut.setFishList(fishList);
            lakeOverviewDtoOutList.add(lakeOverviewDtoOut);
        }
        return lakeOverviewDtoOutList;
    }
}
