package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.MethodDtoIn;
import fpt.g31.fsmis.dto.output.FishingMethodDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.entity.FishingMethod;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.FishingMethodRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FishingMethodService {

    private final FishingMethodRepos fishingMethodRepos;

    public List<FishingMethodDtoOut> getAll(boolean isActiveOnly) {
        List<FishingMethod> fishingMethods;
        if (isActiveOnly) {
            fishingMethods = fishingMethodRepos.findAllByActiveIsTrue();
        } else {
            fishingMethods = fishingMethodRepos.findAll();
        }
        List<FishingMethodDtoOut> fishingMethodDtoOuts = new ArrayList<>();
        for (FishingMethod fishingMethod :
                fishingMethods) {
            FishingMethodDtoOut fishingMethodDtoOut = FishingMethodDtoOut.builder()
                    .id(fishingMethod.getId())
                    .name(fishingMethod.getName())
                    .active(fishingMethod.getActive())
                    .build();
            fishingMethodDtoOuts.add(fishingMethodDtoOut);
        }
        return fishingMethodDtoOuts;
    }

    public ResponseTextDtoOut addMethod(MethodDtoIn methodDtoIn) {
        if (fishingMethodRepos.existsByNameIgnoreCase(methodDtoIn.getName())) {
            throw new ValidationException("Đã tồn tại loại hình câu với tên này");
        }
        FishingMethod fishingMethod = FishingMethod.builder()
                .name(methodDtoIn.getName())
                .active(true)
                .build();
        fishingMethodRepos.save(fishingMethod);
        return new ResponseTextDtoOut("Tạo loại hình câu thành công");
    }


    public ResponseTextDtoOut editMethod(MethodDtoIn methodDtoIn, Long methodId) {
        FishingMethod method = fishingMethodRepos.findById(methodId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy loại hình câu"));
        if (fishingMethodRepos.existsByNameIgnoreCase(methodDtoIn.getName())) {
            throw new ValidationException("Đã tồn tại loại hình câu với tên này");
        }
        method.setName(methodDtoIn.getName());
        fishingMethodRepos.save(method);
        return new ResponseTextDtoOut("Chỉnh sửa loại hình câu thành công");
    }

    public ResponseTextDtoOut changeMethodActive(Long methodId) {
        FishingMethod method = fishingMethodRepos.findById(methodId)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy loại hình câu"));
        method.setActive(!method.getActive());
        fishingMethodRepos.save(method);
        if (Boolean.TRUE.equals(method.getActive())) {
            return new ResponseTextDtoOut("Hiện loại hình câu thành công");
        } else {
            return new ResponseTextDtoOut("Ẩn loại hình câu thành công");
        }
    }
}
