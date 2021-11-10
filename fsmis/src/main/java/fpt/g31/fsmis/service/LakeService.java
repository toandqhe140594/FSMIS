package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.FishInLakeDtoIn;
import fpt.g31.fsmis.dto.input.LakeDtoIn;
import fpt.g31.fsmis.dto.input.LakeEditDtoIn;
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

    private static final String LOCATION_NOT_FOUND = "Không tìm thấy hồ câu!";
    private static final String UNAUTHORIZED = "Không có quyền truy cập!";

    public ResponseTextDtoOut createLake(LakeDtoIn lakeDtoIn, Long fishingLocationId, HttpServletRequest request) {
        FishingLocation fishingLocation = fishingLocationRepos.findById(fishingLocationId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
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
                    .active(true)
//                    .quantity(fishInLakeDtoIn.getQuantity())
//                    .totalWeight(fishInLakeDtoIn.getTotalWeight())
                    .build();
            if (fishInLakeDtoIn.getTotalWeight() == null) {
                fishInLake.setQuantity(fishInLakeDtoIn.getQuantity());
                fishInLake.setTotalWeight(fishInLakeDtoIn.getQuantity() * (fishInLake.getMinWeight() + fishInLake.getMaxWeight()) / 2);
            } else if (fishInLakeDtoIn.getQuantity() == null) {
                fishInLake.setQuantity((int) (fishInLakeDtoIn.getTotalWeight() / ((fishInLake.getMinWeight() + fishInLake.getMaxWeight()) / 2)));
                fishInLake.setTotalWeight(fishInLakeDtoIn.getTotalWeight());
            } else {
                fishInLake.setQuantity(fishInLakeDtoIn.getQuantity());
                fishInLake.setTotalWeight(fishInLakeDtoIn.getTotalWeight());
            }
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
        Lake lake = lakeRepos.findById(lakeId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu"));
        if (lake.getFishingLocation().getId().equals(locationId) && !lake.isActive()) {
            throw new ValidationException("Hồ này không tồn tại");
        }
        List<String> fishingMethodList = new ArrayList<>();
        for (FishingMethod fishingMethod : lake.getFishingMethodSet()) {
            fishingMethodList.add(fishingMethod.getName());
        }

        List<FishInLake> fishesInLake = fishInLakeRepos.findByLakeIdAndActiveIsTrue(lakeId);
        List<FishDtoOut> fishes = new ArrayList<>();
        for (FishInLake fishInLake : fishesInLake) {
            FishDtoOut fish = FishDtoOut.builder()
                    .id(fishInLake.getId())
                    .speciesId(fishInLake.getFishSpecies().getId())
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
        List<Lake> lakeList = lakeRepos.findByFishingLocationIdAndActiveIsTrue(locationId);
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
            for (FishInLake fishInLake : fishInLakeRepos.findByLakeIdAndActiveIsTrue(lake.getId())) {
                fishList.add(fishInLake.getFishSpecies().getName());
            }
            lakeOverviewDtoOut.setFishList(fishList);
            lakeOverviewDtoOutList.add(lakeOverviewDtoOut);
        }
        return lakeOverviewDtoOutList;
    }

    public ResponseTextDtoOut closeLake(Long lakeId, HttpServletRequest request) {
        Lake lake = lakeRepos.findById(lakeId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
        User user = jwtFilter.getUserFromToken(request);
        if (!lake.getFishingLocation().getOwner().equals(user)) {
            throw new ValidationException(UNAUTHORIZED);
        }
        lake.setActive(false);
        lakeRepos.save(lake);
        return new ResponseTextDtoOut("Đóng cửa hồ câu thành công!");
    }

    public ResponseTextDtoOut editLakeInformation(LakeEditDtoIn lakeEditDtoIn, Long lakeId, HttpServletRequest request) {
        Lake lake = lakeRepos.findById(lakeId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
        User user = jwtFilter.getUserFromToken(request);
        if (!lake.getFishingLocation().getOwner().equals(user)) {
            throw new ValidationException(UNAUTHORIZED);
        }
        lake.setName(lakeEditDtoIn.getName());
        lake.setLength(lakeEditDtoIn.getLength());
        lake.setWidth(lakeEditDtoIn.getWidth());
        lake.setDepth(lakeEditDtoIn.getDepth());
        lake.setLastEditTime(LocalDateTime.now());
        lake.setPrice(lakeEditDtoIn.getPrice());
        lake.setImageUrl(lakeEditDtoIn.getImageUrl());
        Set<FishingMethod> fishingMethodSet = new HashSet<>();
        for (Long methodId : lakeEditDtoIn.getMethods()) {
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
        for (Lake lake : location.getLakeList()) {
            List<FishDtoOut> fishDtoOutList = new ArrayList<>();
            for (FishInLake fishInLake : lake.getFishInLakeList()) {
                FishDtoOut fishDtoOut = FishDtoOut.builder()
                        .id(fishInLake.getId())
                        .name(fishInLake.getFishSpecies().getName() + " biểu " + fishInLake.getMinWeight() + "-" + fishInLake.getMaxWeight())
                        .speciesId(fishInLake.getFishSpecies().getId())
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

    public ResponseTextDtoOut addFishToLake(FishInLakeDtoIn fishInLakeDtoIn, Long lakeId, HttpServletRequest request) {
        Lake lake = lakeRepos.findById(lakeId)
                .orElseThrow(() -> new NotFoundException(LOCATION_NOT_FOUND));
        User user = jwtFilter.getUserFromToken(request);
        if (!lake.getFishingLocation().getOwner().equals(user)) {
            throw new ValidationException(UNAUTHORIZED);
        }
        FishInLake fishInLake = FishInLake.builder()
                .id(fishInLakeDtoIn.getId())
                .fishSpecies(fishSpeciesRepos.getById(fishInLakeDtoIn.getFishSpeciesId()))
                .lake(lake)
                .maxWeight(fishInLakeDtoIn.getMaxWeight())
                .minWeight(fishInLakeDtoIn.getMinWeight())
//                .quantity(fishInLakeDtoIn.getQuantity())
//                .totalWeight(fishInLakeDtoIn.getTotalWeight())
                .active(true)
                .build();
        if (fishInLakeDtoIn.getTotalWeight() == null) {
            fishInLake.setQuantity(fishInLakeDtoIn.getQuantity());
            fishInLake.setTotalWeight(fishInLakeDtoIn.getQuantity() * (fishInLake.getMinWeight() + fishInLake.getMaxWeight()) / 2);
        } else if (fishInLakeDtoIn.getQuantity() == null) {
            fishInLake.setQuantity((int) (fishInLakeDtoIn.getTotalWeight() / ((fishInLake.getMinWeight() + fishInLake.getMaxWeight()) / 2)));
            fishInLake.setTotalWeight(fishInLakeDtoIn.getTotalWeight());
        } else {
            fishInLake.setQuantity(fishInLakeDtoIn.getQuantity());
            fishInLake.setTotalWeight(fishInLakeDtoIn.getTotalWeight());
        }
        List<FishInLake> fishInLakeList = lake.getFishInLakeList();
        fishInLakeList.add(fishInLake);
        lake.setFishInLakeList(fishInLakeList);
        lakeRepos.save(lake);
        return new ResponseTextDtoOut("Thêm cá vào hồ thành công!");
    }

    public ResponseTextDtoOut deleteFishFromLake(Long fishInLakeId, HttpServletRequest request) {
        FishInLake fishInLake = fishInLakeRepos.findById(fishInLakeId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi"));
        User user = jwtFilter.getUserFromToken(request);
        if (!fishInLake.getLake().getFishingLocation().getOwner().equals(user)) {
            throw new ValidationException(UNAUTHORIZED);
        }
        fishInLake.setActive(false);
        fishInLakeRepos.save(fishInLake);
        return new ResponseTextDtoOut("Xóa cá khỏi hồ thành công!");
    }

    public ResponseTextDtoOut fishStocking(Long fishInLakeId, HttpServletRequest request, Float weight, Integer quantity) {
        if (weight == null && quantity == null) {
            throw new ValidationException("Cần điền khối lượng hoặc số lượng");
        }
        FishInLake fishInLake = fishInLakeRepos.findById(fishInLakeId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bản ghi"));
        User user = jwtFilter.getUserFromToken(request);
        if (!fishInLake.getLake().getFishingLocation().getOwner().equals(user)) {
            throw new ValidationException(UNAUTHORIZED);
        }
        if (weight == null) {
            fishInLake.setQuantity(fishInLake.getQuantity() + quantity);
            fishInLake.setTotalWeight(fishInLake.getTotalWeight() + quantity * (fishInLake.getMinWeight() + fishInLake.getMaxWeight()) / 2);
        } else if (quantity == null) {
            fishInLake.setQuantity(fishInLake.getQuantity() + (int) (weight / ((fishInLake.getMinWeight() + fishInLake.getMaxWeight()) / 2)));
            fishInLake.setTotalWeight(fishInLake.getTotalWeight() + weight);
        } else {
            fishInLake.setQuantity(fishInLake.getQuantity() + quantity);
            fishInLake.setTotalWeight(fishInLake.getTotalWeight() + weight);
        }
        fishInLakeRepos.save(fishInLake);
        return new ResponseTextDtoOut("Bồi cá thành công!");
    }
}