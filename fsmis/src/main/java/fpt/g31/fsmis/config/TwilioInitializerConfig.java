package fpt.g31.fsmis.config;

import com.twilio.Twilio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TwilioInitializerConfig {

    private final static Logger LOGGER = LoggerFactory.getLogger(TwilioInitializerConfig.class);

    private final TwilioConfig twilioConfig;

    @Autowired
    public TwilioInitializerConfig(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }
}
