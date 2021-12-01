package fpt.g31.fsmis;

import com.fasterxml.jackson.databind.ObjectMapper;
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
public class AddressController {

    @Autowired
    private MockMvc mockmvc;

    @Autowired
    private ObjectMapper objectMapper;

    // getAll
    private final String getAll = "/api/address";

    @Test
    void getAll_T01() throws Exception {
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getAll))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    // getDistrictByProvinceId
    private final String getDistrictByProvinceId = "/api/address/district?provinceId={provinceId}";

    @Test
    void getDistrictByProvinceId_T01() throws Exception {
        Long provinceId = 1L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getDistrictByProvinceId, provinceId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void getDistrictByProvinceId_T02() throws Exception {
        Long provinceId = 0L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getDistrictByProvinceId, provinceId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void getDistrictByProvinceId_T03() throws Exception {
        Long provinceId = 1000000L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getDistrictByProvinceId, provinceId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void getDistrictByProvinceId_T04() throws Exception {
        String provinceId = "abc";
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getDistrictByProvinceId, provinceId))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    // getAllProvince
    private final String getAllProvince = "/api/address/province";

    @Test
    void getAllProvince_T01() throws Exception {
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getAllProvince))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    // getWardByDistrictId
    private final String getWardByDistrictId = "/api/address/ward?districtId={districtId}";

    @Test
    void getWardByDistrictId_T01() throws Exception {
        Long districtId = 1L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getWardByDistrictId, districtId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void getWardByDistrictId_T02() throws Exception {
        Long districtId = 0L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getWardByDistrictId, districtId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void getWardByDistrictId_T03() throws Exception {
        Long districtId = 1000000L;
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getWardByDistrictId, districtId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }

    @Test
    void getWardByDistrictId_T04() throws Exception {
        String districtId = "abc";
        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getWardByDistrictId, districtId))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertNotNull(result.getResponse().getContentAsString());
    }
}
