//package fpt.g31.fsmis;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import fpt.g31.fsmis.dto.output.AuthTokenDtoOut;
//import org.junit.jupiter.api.BeforeAll;
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
//public class AdminAccountController {
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
//    // adminGetAccountList
//    private final String adminGetAccountList = "/api/admin/account?pageNo={pageNo}&phone={phone}";
//
//    @Test
//    void adminGetAccountList_T01() throws Exception {
//        int pageNo = 1;
//        String phone = "";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T02() throws Exception {
//        int pageNo = 0;
//        String phone = "";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T03() throws Exception {
//        int pageNo = 1000000;
//        String phone = "";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T04() throws Exception {
//        String pageNo = "abcd";
//        String phone = "";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T05() throws Exception {
//        int pageNo = 1;
//        String phone = "098";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T06() throws Exception {
//        int pageNo = 1;
//        String phone = "0963372727";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T07() throws Exception {
//        int pageNo = 1;
//        String phone = "0988888888";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T08() throws Exception {
//        int pageNo = 0;
//        String phone = "098";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T09() throws Exception {
//        int pageNo = 0;
//        String phone = "0963372727";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T10() throws Exception {
//        int pageNo = 0;
//        String phone = "0988888888";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T11() throws Exception {
//        int pageNo = 1000000;
//        String phone = "098";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T12() throws Exception {
//        int pageNo = 1000000;
//        String phone = "0963372727";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T13() throws Exception {
//        int pageNo = 1000000;
//        String phone = "0988888888";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T14() throws Exception {
//        String pageNo = "abcd";
//        String phone = "098";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T15() throws Exception {
//        String pageNo = "abcd";
//        String phone = "0963372727";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccountList_T16() throws Exception {
//        String pageNo = "abcd";
//        String phone = "0988888888";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccountList, pageNo, phone)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    // adminGetAccount
//    private final String adminGetAccount = "/api/admin/account/{userId}";
//
//    @Test
//    void adminGetAccount_T01() throws Exception {
//        Long userId = 0L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isNotFound())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T02() throws Exception {
//        Long userId = 1L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T03() throws Exception {
//        Long userId = 1000000L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isNotFound())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T04() throws Exception {
//        String userId = "abcd";
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T05() throws Exception {
//        Long userId = 2L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T06() throws Exception {
//        Long userId = 3L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T07() throws Exception {
//        Long userId = 3L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T08() throws Exception {
//        Long userId = 4L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//    @Test
//    void adminGetAccount_T09() throws Exception {
//        Long userId = 100L;
//        MvcResult result = mockmvc.perform(MockMvcRequestBuilders.get(adminGetAccount, userId)
//                        .header("Authorization", "Bearer " + token))
//                .andExpect(status().isNotFound())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andReturn();
//
//        assertNotNull(result.getResponse().getContentAsString());
//    }
//
//}
