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
    private static final String LOCATION_NOT_FOUND = "Không tìm thấy hồ câu!";
    private static final String UNAUTHORIZED = "Không có quyền truy cập!";
    private static final String INVALID_WEIGHT_RANGE = "Lỗi do biểu nhập ngược!";
    private LakeRepos lakeRepos;
    private FishingLocationRepos fishingLocationRepos;
    private FishSpeciesRepos fishSpeciesRepos;
    private ModelMapper modelMapper;
    private FishInLakeRepos fishInLakeRepos;
    private FishingMethodRepos methodRepos;
    private JwtFilter jwtFilter;

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
            if (fishInLakeDtoIn.getMaxWeight() < fishInLakeDtoIn.getMinWeight()) {
                throw new ValidationException(INVALID_WEIGHT_RANGE);
            }
            FishSpecies fishSpecies = fishSpeciesRepos.getById(fishInLakeDtoIn.getFishSpeciesId());
            FishInLake fishInLake = FishInLake.builder()
                    .fishSpecies(fishSpecies)
                    .lake(lake)
                    .maxWeight(fishInLakeDtoIn.getMaxWeight())
                    .minWeight(fishInLakeDtoIn.getMinWeight())
                    .active(true)
                    .build();
            setWeightAndQuantity(fishInLakeDtoIn, fishInLake);
            fishInLakeList.add(fishInLake);
            fishSpecies.setAppearanceCount(fishSpecies.getAppearanceCount() + 1);
            fishSpeciesRepos.save(fishSpecies);
        }
        lake.setFishInLakeList(fishInLakeList);
        setMethodSet(lake, lakeDtoIn.getMethods());
        return new ResponseTextDtoOut("Tạo hồ câu thành công!");
    }

    private void setMethodSet(Lake lake, Long[] methods) {
        Set<FishingMethod> fishingMethodSet = new HashSet<>();
        for (Long methodId : methods) {
            FishingMethod fishingMethod = methodRepos.findById(methodId)
                    .orElseThrow(() -> new NotFoundException("Không tìm thấy loại hình câu!"));
            fishingMethodSet.add(fishingMethod);
        }
        lake.setFishingMethodSet(fishingMethodSet);
        lakeRepos.save(lake);
    }

    private void setWeightAndQuantity(FishInLakeDtoIn fishInLakeDtoIn, FishInLake fishInLake) {
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
    }

    public LakeDtoOut getLakeById(Long locationId, long lakeId) {
        Lake lake = lakeRepos.findById(lakeId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy hồ câu"));
        if (lake.getFishingLocation().getId().equals(locationId) && Boolean.TRUE.equals(!lake.getActive())) {
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
        if (!fishingLocationOptional.isPresent()) {
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
        setMethodSet(lake, lakeEditDtoIn.getMethods());
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
                throw new ValidationException(INVALID_WEIGHT_RANGE + ", dòng " + row);
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

    private void checkValidFishInLake(FishInLakeDtoIn fishInLakeDtoIn) {
        if (!fishSpeciesRepos.existsById(fishInLakeDtoIn.getFishSpeciesId())) {
            throw new NotFoundException("Không tìm thấy loài cá này!");
        }
        if (fishInLakeDtoIn.getMinWeight() > fishInLakeDtoIn.getMaxWeight()) {
            throw new ValidationException(INVALID_WEIGHT_RANGE);
        }
        if (fishInLakeDtoIn.getQuantity() == null && fishInLakeDtoIn.getTotalWeight() == null) {
            throw new ValidationException("Cần điền thông tin về số lượng hoặc tổng khối lượng cá");
        }
//            if user fill both quantity and total weight field, check if total weight is between
//            min weight * quantity and max weight * quantity
        if (fishInLakeDtoIn.getQuantity() != null && fishInLakeDtoIn.getTotalWeight() != null
                && (fishInLakeDtoIn.getTotalWeight() < fishInLakeDtoIn.getMinWeight() * fishInLakeDtoIn.getQuantity()
                || fishInLakeDtoIn.getTotalWeight() > fishInLakeDtoIn.getMaxWeight() * fishInLakeDtoIn.getQuantity())) {
            throw new ValidationException("Tương quan khối lượng và số lượng không hợp lệ");
        }
    }

    public List<LakeWithFishInLakeDtoOut> getAllLakeWithFishInLake(Long locationId) {
        FishingLocation location = fishingLocationRepos.findById(locationId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy khu hồ!"));
        List<LakeWithFishInLakeDtoOut> output = new ArrayList<>();
        for (Lake lake : location.getLakeList()) {
            if (Boolean.FALSE.equals(lake.getActive())) {
                continue;
            }
            List<FishDtoOut> fishDtoOutList = new ArrayList<>();
            for (FishInLake fishInLake : lake.getFishInLakeList()) {
                if (Boolean.FALSE.equals(fishInLake.getActive())) {
                    continue;
                }
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
        checkValidFishInLake(fishInLakeDtoIn);
        if (Boolean.TRUE.equals(fishInLakeRepos.existsByFishSpeciesIdAndMinWeightAndMaxWeightAndLakeIdAndActiveIsTrue
                (fishInLakeDtoIn.getFishSpeciesId(), fishInLakeDtoIn.getMinWeight(), fishInLakeDtoIn.getMaxWeight(), lakeId))) {
            throw new ValidationException("Đã tồn tại 1 bản ghi với cùng loài cá và biểu");
        }
        FishSpecies fishSpecies = fishSpeciesRepos.getById(fishInLakeDtoIn.getFishSpeciesId());
        FishInLake fishInLake = FishInLake.builder()
                .id(fishInLakeDtoIn.getId())
                .fishSpecies(fishSpecies)
                .lake(lake)
                .maxWeight(fishInLakeDtoIn.getMaxWeight())
                .minWeight(fishInLakeDtoIn.getMinWeight())
                .active(true)
                .build();
        setWeightAndQuantity(fishInLakeDtoIn, fishInLake);
        List<FishInLake> fishInLakeList = lake.getFishInLakeList();
        fishInLakeList.add(fishInLake);
        lake.setFishInLakeList(fishInLakeList);
        lakeRepos.save(lake);
        fishSpecies.setAppearanceCount(fishSpecies.getAppearanceCount() + 1);
        fishSpeciesRepos.save(fishSpecies);
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
//            if user fill both quantity and total weight field, check if total weight is between
//            min weight * quantity and max weight * quantity
        if (quantity != null && weight != null
                && (weight < fishInLake.getMinWeight() * quantity
                || weight > fishInLake.getMaxWeight() * quantity)) {
            throw new ValidationException("Tương quan khối lượng và số lượng không hợp lệ");
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
