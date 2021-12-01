package fpt.g31.fsmis;

import com.fasterxml.jackson.databind.ObjectMapper;
import fpt.g31.fsmis.dto.output.AuthTokenDtoOut;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
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
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AdminFishingLocationController {

    @Autowired
    private MockMvc mockmvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String token = "";

    @BeforeAll
    void setup() throws Exception {
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .content("{\"password\":\"Asdf2k@!\",\"phone\":\"0921485233\"}")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andReturn();

        AuthTokenDtoOut auth = objectMapper.readValue(result.getResponse().getContentAsString(), AuthTokenDtoOut.class);
        token = auth.getAuthToken();
    }

    // adminGetLocationList
    private final String adminGetLocationList = "/api/admin/location?pageNo={pageNo}&active={active}&input={input}&verified={verified}";

    @Test
    void adminGetLocationList_T01() throws Exception {
        Integer pageNo = null;
        String input = null;
        Boolean active = null;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T02() throws Exception {
        Integer pageNo = 1;
        String input = null;
        Boolean active = null;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T03() throws Exception {
        Integer pageNo = 2;
        String input = null;
        Boolean active = null;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T04() throws Exception {
        Integer pageNo = 1000000;
        String input = null;
        Boolean active = null;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T05() throws Exception {
        Integer pageNo = 0;
        String input = null;
        Boolean active = null;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T06() throws Exception {
        String pageNo = "asdf";
        String input = null;
        Boolean active = null;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T07() throws Exception {
        Integer pageNo = null;
        String input = null;
        Boolean active = true;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T08() throws Exception {
        Integer pageNo = 1;
        String input = null;
        Boolean active = true;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T09() throws Exception {
        Integer pageNo = 2;
        String input = null;
        Boolean active = true;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T10() throws Exception {
        Integer pageNo = 1000000;
        String input = null;
        Boolean active = true;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T11() throws Exception {
        Integer pageNo = 0;
        String input = null;
        Boolean active = true;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T12() throws Exception {
        String pageNo = "abcd";
        String input = null;
        Boolean active = true;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T13() throws Exception {
        Integer pageNo = null;
        String input = null;
        Boolean active = false;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T14() throws Exception {
        Integer pageNo = 1;
        String input = null;
        Boolean active = false;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T15() throws Exception {
        Integer pageNo = 2;
        String input = null;
        Boolean active = false;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T16() throws Exception {
        Integer pageNo = 1000000;
        String input = null;
        Boolean active = false;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T17() throws Exception {
        Integer pageNo = 0;
        String input = null;
        Boolean active = false;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T18() throws Exception {
        String pageNo = "abcd";
        String input = null;
        Boolean active = false;
        Boolean verified = null;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T19() throws Exception {
        Integer pageNo = null;
        String input = null;
        Boolean active = null;
        Boolean verified = true;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T20() throws Exception {
        Integer pageNo = 1;
        String input = null;
        Boolean active = null;
        Boolean verified = true;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T21() throws Exception {
        Integer pageNo = 2;
        String input = null;
        Boolean active = null;
        Boolean verified = true;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T22() throws Exception {
        Integer pageNo = 1000000;
        String input = null;
        Boolean active = null;
        Boolean verified = true;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T23() throws Exception {
        Integer pageNo = 0;
        String input = null;
        Boolean active = null;
        Boolean verified = true;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T24() throws Exception {
        String pageNo = "abcd";
        String input = null;
        Boolean active = null;
        Boolean verified = false;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T25() throws Exception {
        Integer pageNo = null;
        String input = null;
        Boolean active = true;
        Boolean verified = false;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T26() throws Exception {
        Integer pageNo = 1;
        String input = null;
        Boolean active = null;
        Boolean verified = false;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T27() throws Exception {
        Integer pageNo = 2;
        String input = null;
        Boolean active = null;
        Boolean verified = false;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T28() throws Exception {
        Integer pageNo = 1000000;
        String input = null;
        Boolean active = null;
        Boolean verified = false;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T29() throws Exception {
        Integer pageNo = 0;
        String input = null;
        Boolean active = null;
        Boolean verified = false;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void adminGetLocationList_T30() throws Exception {
        String pageNo = "abcd";
        String input = null;
        Boolean active = null;
        Boolean verified = false;

        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetLocationList, pageNo, active, input, verified)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        System.out.println(result.getResponse().getContentAsString());
        assertNotNull(result.getResponse().getContentAsString());
    }
}
