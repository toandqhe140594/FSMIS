package fpt.g31.fsmis.AddressController;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class GetWardByDistrictId {

    @Autowired
    private MockMvc mockmvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final String url = "/api/address/ward?districtId={id}";

    // Get with exited id
    @Test
    void T01() throws Exception {
        Long id = 1L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(url, id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    // Get with id non existed
    @Test
    void T02() throws Exception {
        Long id = 0L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(url, id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    // Get with id non existed
    @Test
    void T03() throws Exception {
        Long id = 1000000L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(url, id))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    // Get weird params
    @Test
    void T04() throws Exception {
        String id = "abc";
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(url, id))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }
}
