package fpt.g31.fsmis.service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import fpt.g31.fsmis.config.TwilioConfig;
import fpt.g31.fsmis.dto.input.ValidateOtpDtoIn;
import fpt.g31.fsmis.dto.output.ResponseTextDtoOut;
import fpt.g31.fsmis.repository.BannedPhoneRepos;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.text.DecimalFormat;
import java.util.Map;
import java.util.Random;

@Service
@AllArgsConstructor
public class TwilioOtpService {

    private final BannedPhoneRepos bannedPhoneRepos;
    Map<String, String> otpMap;
    private UserRepos userRepos;
    private TwilioConfig twilioConfig;

    public ResponseTextDtoOut sendOtpForExistedUser(String phone) {
        if (Boolean.FALSE.equals(userRepos.existsByPhone(phone))) {
            throw new ValidationException("Số điện thoại này không tồn tại trong hệ thống");
        }
        return sendOtp(phone);
    }

    public ResponseTextDtoOut sendOtpForNonExistedUser(String phone) {
        if (Boolean.TRUE.equals(userRepos.existsByPhone(phone))) {
            throw new ValidationException("Số điện thoại này đã tồn tại trong hệ thống");
        }
        return sendOtp(phone);
    }

    public ResponseTextDtoOut sendOtp(String phone) {
        if (bannedPhoneRepos.existsById(phone)) {
            throw new ValidationException("Số điện thoại bị cấm khỏi hệ thống");
        }
        phone = "+84" + phone.substring(1);
        PhoneNumber to = new PhoneNumber(phone);
        PhoneNumber from = new PhoneNumber(System.getenv("TWILIO_TRIAL_NUMBER"));
        String otp = generateOtp();
        String otpMessage = "(FSMIS) Ma xac nhan cua ban la " + otp;
        Message.creator(to, from, otpMessage).create();
        otpMap.put(phone, otp);
        return new ResponseTextDtoOut("Gửi OTP thành công");
    }

    public ResponseTextDtoOut validateOtp(ValidateOtpDtoIn validateOtpDtoIn) {
        String phone = "+84" + validateOtpDtoIn.getPhone().substring(1);
        String userInputOtp = validateOtpDtoIn.getOtp();

        if (userInputOtp.equals(otpMap.get(phone))) {
            otpMap.remove(phone, userInputOtp);
            return new ResponseTextDtoOut("Xác thực thành công");
        } else {
            throw new ValidationException("Mã OTP không đúng");
        }
    }

    private String generateOtp() {
        return new DecimalFormat("000000").format(new Random().nextInt(999999));
    }
}
