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
        Twilio.init("AC102fa5b6a688f7af0cf147d8b5cabe81", "6399060736da0b045492455238473c9c");
    }
}
