package fpt.g31.fsmis.config;

import com.twilio.Twilio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TwilioInitializerConfig {

    private final TwilioConfig twilioConfig;

    @Autowired
    public TwilioInitializerConfig(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(System.getenv("TWILIO_ACCOUNT_SID"), System.getenv("TWILIO_AUTH_TOKEN"));
    }
}
