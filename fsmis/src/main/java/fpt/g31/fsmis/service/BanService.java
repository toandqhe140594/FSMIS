package fpt.g31.fsmis.service;

import fpt.g31.fsmis.dto.input.BanPhoneDtoIn;
import fpt.g31.fsmis.dto.output.BannedPhoneDtoOut;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.entity.BannedPhone;
import fpt.g31.fsmis.exception.NotFoundException;
import fpt.g31.fsmis.repository.BannedPhoneRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BanService {
    private final BannedPhoneRepos bannedPhoneRepos;

    public List<BannedPhoneDtoOut> getBannedPhone() {
        List<BannedPhoneDtoOut> output = new ArrayList<>();
        List<BannedPhone> bannedPhoneList = bannedPhoneRepos.findAll();
        for (BannedPhone bannedPhone : bannedPhoneList) {
            BannedPhoneDtoOut dto = BannedPhoneDtoOut.builder()
                    .phone(bannedPhone.getPhone())
                    .description(bannedPhone.getDescription() == null ? "" : bannedPhone.getDescription())
                    .build();
            output.add(dto);
        }
        return output;
    }

    public ResponseTextDtoOut banPhone(BanPhoneDtoIn banPhoneDtoIn) {
        if (bannedPhoneRepos.existsById(banPhoneDtoIn.getPhone())) {
            throw new ValidationException("Số điện thoại này đã bị cấm từ trước");
        }
        BannedPhone bannedPhone = new BannedPhone(banPhoneDtoIn.getPhone(), banPhoneDtoIn.getDescription());
        bannedPhoneRepos.save(bannedPhone);
        return new ResponseTextDtoOut("Cấm số điện thoại thành công");
    }

    public ResponseTextDtoOut unbanPhone(String phone) {
        BannedPhone bannedPhone = bannedPhoneRepos.findById(phone)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy số điện thoại bị cấm"));
        bannedPhoneRepos.delete(bannedPhone);
        return new ResponseTextDtoOut("Bỏ cấm số điện thoại thành công");
    }
}
