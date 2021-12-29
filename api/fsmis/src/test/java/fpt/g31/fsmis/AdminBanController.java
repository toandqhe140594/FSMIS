//package fpt.g31.fsmis;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import fpt.g31.fsmis.dto.output.AuthTokenDtoOut;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestInstance;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@TestInstance(TestInstance.Lifecycle.PER_CLASS)
//public class AdminBanController {
//
//    @Autowired
//    private MockMvc mockmvc;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    private String token = "";
//
//    @BeforeAll
//    void setup() throws Exception {
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
//                        .content("{\"password\":\"Asdf2k@!\",\"phone\":\"0921485233\"}")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        AuthTokenDtoOut auth = objectMapper.readValue(result.getResponse().getContentAsString(), AuthTokenDtoOut.class);
//        token = auth.getAuthToken();
//    }
//
//    // getBannedPhoneList
//    private final String getBannedPhoneList = "/api/admin/ban";
//
//    @Test
//    void getBannedPhoneList_T01() throws Exception {
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(getBannedPhoneList)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//}
