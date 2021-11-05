package fpt.g31.fsmis.UserController;

import com.fasterxml.jackson.databind.ObjectMapper;
import fpt.g31.fsmis.Util;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GetPersonalInformation {

    @Autowired
    private MockMvc mockmvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final String url = "/api/personal";

    @Test
    void T01() throws Exception {
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders
                        .get(url)
                        .header("Authorization", "Bearer " + Util.validToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void T02() throws Exception {
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders
                        .get(url)
                        .header("Authorization", "Bearer " + Util.expiredToken))
                .andExpect(status().isForbidden())
                .andReturn();

        System.out.println(result.getResponse().getStatus());
    }

    @Test
    void T03() throws Exception {
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders
                        .get(url)
                        .header("Authorization", "Bearer " + "sadfasdfsdfasdfsdf"))
                .andExpect(status().isForbidden())
                .andReturn();

        System.out.println(result.getResponse().getStatus());
    }

    @Test
    void T04() throws Exception {
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders
                        .get(url))
                .andExpect(status().isForbidden())
                .andReturn();
    }
}
