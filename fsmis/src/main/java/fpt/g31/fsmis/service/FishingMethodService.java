package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.output.FishingMethodDtoOut;
import fpt.g31.fsmis.entity.FishingMethod;
import fpt.g31.fsmis.repository.FishingMethodRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FishingMethodService {

    private final FishingMethodRepos fishingMethodRepos;

    public List<FishingMethodDtoOut> getAll() {
        List<FishingMethod> fishingMethods = fishingMethodRepos.findAllByActiveIsTrue();
        List<FishingMethodDtoOut> fishingMethodDtoOuts = new ArrayList<>();
        for (FishingMethod fishingMethod :
                fishingMethods) {
            FishingMethodDtoOut fishingMethodDtoOut = FishingMethodDtoOut.builder()
                    .id(fishingMethod.getId())
                    .name(fishingMethod.getName())
                    .build();
            fishingMethodDtoOuts.add(fishingMethodDtoOut);
        }
        return fishingMethodDtoOuts;
    }
}
