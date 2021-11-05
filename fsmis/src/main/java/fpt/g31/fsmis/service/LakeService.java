package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.FishInLakeDtoIn;
import fpt.g31.fsmis.dto.input.LakeDtoIn;
import fpt.g31.fsmis.dto.output.*;
import fpt.g31.fsmis.entity.*;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.*;
import fpt.g31.fsmis.security.JwtFilter;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
public class LakeService {
    private LakeRepos lakeRepos;
    private FishingLocationRepos fishingLocationRepos;
    private FishSpeciesRepos fishSpeciesRepos;
    private ModelMapper modelMapper;
    private FishInLakeRepos fishInLakeRepos;
    private FishingMethodRepos methodRepos;
    private JwtFilter jwtFilter;

    public ResponseTextDtoOut createLake(LakeDtoIn lakeDtoIn, Long fishingLocationId, HttpServletRequest request) {
        FishingLocation fishingLocation = fishingLocationRepos.findById(fishingLocationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu!"));
        User owner = jwtFilter.getUserFromToken(request);
        if (!fishingLocation.getOwner().equals(owner)) {
            throw new ValidationException("Không phải chủ hồ, không có quyền tạo hồ con!");
        }
        checkValidFishInLakeList(lakeDtoIn);
        Lake lake = modelMapper.map(lakeDtoIn, Lake.class);
        lake.setActive(true);
        lake.setLastEditTime(LocalDateTime.now());
        lake.setFishingLocation(fishingLocation);
        List<FishInLake> fishInLakeList = new ArrayList<>();
        for (FishInLakeDtoIn fishInLakeDtoIn : lakeDtoIn.getFishInLakeList()) {
            FishInLake fishInLake = FishInLake.builder()
                    .fishSpecies(fishSpeciesRepos.getById(fishInLakeDtoIn.getFishSpeciesId()))
                    .lake(lake)
                    .maxWeight(fishInLakeDtoIn.getMaxWeight())
                    .minWeight(fishInLakeDtoIn.getMinWeight())
                    .quantity(fishInLakeDtoIn.getQuantity())
                    .totalWeight(fishInLakeDtoIn.getTotalWeight())
                    .build();
            fishInLakeList.add(fishInLake);
        }
        lake.setFishInLakeList(fishInLakeList);
        Set<FishingMethod> fishingMethodSet = new HashSet<>();
        for (Long methodId : lakeDtoIn.getMethods()) {
            FishingMethod fishingMethod = methodRepos.findById(methodId)
                    .orElseThrow(() -> new NotFoundException("Không tìm thấy loại hình câu!"));
            fishingMethodSet.add(fishingMethod);
        }
        lake.setFishingMethodSet(fishingMethodSet);
        lakeRepos.save(lake);
        return new ResponseTextDtoOut("Tạo hồ câu thành công!");
    }

    public LakeDtoOut getLakeById(Long locationId, long lakeId) {
        Lake lake = lakeRepos.getById(lakeId);
        if (lake.getFishingLocation().getId().equals(locationId) && !lake.isActive()) {
            throw new ValidationException("Hồ này không tồn tại");
        }
        List<String> fishingMethodList = new ArrayList<>();
        for (FishingMethod fishingMethod : lake.getFishingMethodSet()) {
            fishingMethodList.add(fishingMethod.getName());
        }

        List<FishInLake> fishesInLake = fishInLakeRepos.findByLakeId(lakeId);
        List<FishDtoOut> fishes = new ArrayList<>();
        for (FishInLake fishInLake : fishesInLake) {
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
        if (!fishingLocationOptional.isPresent() || Boolean.FALSE.equals(fishingLocationOptional.get().getActive())) {
            throw new NotFoundException("Không tìm thấy khu hồ!");
        }
        List<Lake> lakeList = lakeRepos.findByFishingLocationId(locationId);
        List<LakeOverviewDtoOut> lakeOverviewDtoOutList = new ArrayList<>();
        for (Lake lake : lakeList) {
            LakeOverviewDtoOut lakeOverviewDtoOut = modelMapper.map(lake, LakeOverviewDtoOut.class);
            lakeOverviewDtoOut.setImage(lake.getImageUrl());
            List<String> fishingMethodList = new ArrayList<>();
            for (FishingMethod fishingMethod : lake.getFishingMethodSet()) {
                fishingMethodList.add(fishingMethod.getName());
            }
            lakeOverviewDtoOut.setFishingMethodList(fishingMethodList);
            List<String> fishList = new ArrayList<>();
            for (FishInLake fishInLake : fishInLakeRepos.findByLakeId(lake.getId())) {
                fishList.add(fishInLake.getFishSpecies().getName());
            }
            lakeOverviewDtoOut.setFishList(fishList);
            lakeOverviewDtoOutList.add(lakeOverviewDtoOut);
        }
        return lakeOverviewDtoOutList;
    }

    public ResponseTextDtoOut closeLake(Long lakeId, HttpServletRequest request) {
        Lake lake = lakeRepos.findById(lakeId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu!"));
        User user = jwtFilter.getUserFromToken(request);
        if (!lake.getFishingLocation().getOwner().equals(user)) {
            throw new ValidationException("Không có quyền truy cập!");
        }
        lake.setActive(false);
        lakeRepos.save(lake);
        return new ResponseTextDtoOut("Đóng cửa hồ câu thành công!");
    }

    public ResponseTextDtoOut editLake(LakeDtoIn lakeDtoIn, Long lakeId, HttpServletRequest request) {
        Lake lake = lakeRepos.findById(lakeId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu!"));
        User user = jwtFilter.getUserFromToken(request);
        if (!lake.getFishingLocation().getOwner().equals(user)) {
            throw new ValidationException("Không có quyền truy cập!");
        }
        checkValidFishInLakeList(lakeDtoIn);
        lake.setName(lakeDtoIn.getName());
        lake.setLength(lakeDtoIn.getLength());
        lake.setWidth(lakeDtoIn.getWidth());
        lake.setDepth(lakeDtoIn.getDepth());
        lake.setLastEditTime(LocalDateTime.now());
        lake.setPrice(lakeDtoIn.getPrice());
        lake.setImageUrl(lakeDtoIn.getImageUrl());
        List<FishInLake> fishInLakeList = new ArrayList<>();
        for (FishInLakeDtoIn fishInLakeDtoIn : lakeDtoIn.getFishInLakeList()) {
            FishInLake fishInLake = FishInLake.builder()
                    .id(fishInLakeDtoIn.getId())
                    .fishSpecies(fishSpeciesRepos.getById(fishInLakeDtoIn.getFishSpeciesId()))
                    .lake(lake)
                    .maxWeight(fishInLakeDtoIn.getMaxWeight())
                    .minWeight(fishInLakeDtoIn.getMinWeight())
                    .quantity(fishInLakeDtoIn.getQuantity())
                    .totalWeight(fishInLakeDtoIn.getTotalWeight())
                    .build();
            fishInLakeList.add(fishInLake);
        }
        lake.setFishInLakeList(fishInLakeList);
        Set<FishingMethod> fishingMethodSet = new HashSet<>();
        for (Long methodId : lakeDtoIn.getMethods()) {
            FishingMethod fishingMethod = methodRepos.findById(methodId)
                    .orElseThrow(() -> new NotFoundException("Không tìm thấy loại hình câu!"));
            fishingMethodSet.add(fishingMethod);
        }
        lake.setFishingMethodSet(fishingMethodSet);
        lakeRepos.save(lake);
        return new ResponseTextDtoOut("Chỉnh sửa thông tin hồ câu thành công!");
    }

    private void checkValidFishInLakeList(LakeDtoIn lakeDtoIn) {
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
    }

    public List<LakeWithFishInLakeDtoOut> getAllLakeWithFishInLake(Long locationId) {
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khu hồ!"));
        List<LakeWithFishInLakeDtoOut> output = new ArrayList<>();
//        List<Lake> lakeList = lakeRepos.findByFishingLocationId(locationId);
//        for (Lake lake : lakeList) {
        for (Lake lake : location.getLakeList()) {
            List<FishDtoOut> fishDtoOutList = new ArrayList<>();
//            List<FishInLake> fishInLakeList = fishInLakeRepos.findByLakeId(lake.getId());
//            for (FishInLake fishInLake: fishInLakeList){
            for (FishInLake fishInLake : lake.getFishInLakeList()) {
                FishDtoOut fishDtoOut = FishDtoOut.builder()
                        .id(fishInLake.getId())
                        .name(fishInLake.getFishSpecies().getName() + " biểu " + fishInLake.getMinWeight() + "-" + fishInLake.getMaxWeight())
                        .build();
                fishDtoOutList.add(fishDtoOut);
            }
            LakeWithFishInLakeDtoOut lakeWithFishInLakeDtoOut = LakeWithFishInLakeDtoOut.builder()
                    .id(lake.getId())
                    .name(lake.getName())
                    .fishDtoOutList(fishDtoOutList)
                    .build();
            output.add(lakeWithFishInLakeDtoOut);
        }
        return output;
    }
}
