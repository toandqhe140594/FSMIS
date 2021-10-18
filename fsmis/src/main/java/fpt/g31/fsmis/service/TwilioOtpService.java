package fpt.g31.fsmis.service;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.validation.ValidationException;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;
import fpt.g31.fsmis.config.TwilioConfig;
import fpt.g31.fsmis.dto.input.ValidateOtpDtoIn;
import fpt.g31.fsmis.repository.UserRepos;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TwilioOtpService {

    private UserRepos userRepos;
    private TwilioConfig twilioConfig;

    Map<String, String> otpMap = new HashMap<>();

    // Forgot password
    public String sendOtpForExistedUser(String phone) {
        if(!userRepos.existsByPhone(phone)) {
            throw new ValidationException("Số điện thoại này không tồn tại trong hệ thống");
        }
        return sendOtp(phone);
    }

    // register and change password
    public String sendOtpForNonExistedUser(String phone) {
        if(userRepos.existsByPhone(phone)) {
            throw new ValidationException("Số điện thoại này đã tồn tại trong hệ thống");
        }
        return sendOtp(phone);
    }

    private String sendOtp(String phone) {
        phone = "+84" + phone.substring(1);
        PhoneNumber to = new PhoneNumber(phone);
        PhoneNumber from = new PhoneNumber(twilioConfig.getTrialNumber());
        String otp = generateOtp();
        String otpMessage = "FSMIS - Ma xac nhan cua ban la " + otp;
        Message message = Message.creator(to, from, otpMessage).create();
        otpMap.put(phone, otp);
        return "Gửi OTP thành công";
    }

    public String validateOtp(ValidateOtpDtoIn validateOtpDtoIn) {
        String phone = "+84" + validateOtpDtoIn.getPhone().substring(1);
        String userInputOtp = validateOtpDtoIn.getOtp();
        
        if (userInputOtp.equals(otpMap.get(phone))) {
            otpMap.remove(phone, userInputOtp);
            return "Xác thực thành công";
        } else {
            throw new ValidationException("Mã OTP không đúng");
        }
    }

    private String generateOtp() {
        return new DecimalFormat("000000").format(new Random().nextInt(999999));
    }
}
