//package com.alan10607.ag.controller.forum;
//
//import jakarta.servlet.http.Cookie;
//import lombok.extern.slf4j.Slf4j;
//import org.json.JSONObject;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.MediaType;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.MvcResult;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@ExtendWith(SpringExtension.class)
//@Slf4j
//class ForumControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//    private Cookie authorization;
//    private String[] ids = {"9e8d53c4-8650-4942-97a0-9cc830e9c6c9", "9e8d53c4-8650-4942-97a0-9cc830e9c6c9", "bdb204f5-0b9e-4938-8024-2cb520bd7db4", "1f280103-fc8f-42b8-ab56-620e8eadedf8", "feea8423-f853-4496-95e3-64a220597bdd"};
//
//    @BeforeEach
//    @Test
//    void login() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.POST, "/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(new JSONObject()
//                                .put("password", "alan")
//                                .put("email", "alan@alan")
//                                .toString()))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print())
//                .andDo(result -> authorization = result.getResponse().getCookie("Authorization"))
//                .andReturn();
//    }
//
//
//    @Test
//    void getId() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.GET, "/forum/id")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .cookie(authorization))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print())
//                .andReturn();
//    }
//
//    @Test
//    void getArticleWithContent() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.GET, "/forum/article/" + String.join(",", ids) + "/0,1,2,3,4,5,6,7,8,9")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .cookie(authorization))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print())
//                .andReturn();
//    }
//
//    @Test
//    void createArticleWithContent() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.POST, "/forum/article")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .cookie(authorization)
//                        .content(new JSONObject()
//                                .put("title", "title from unit test")
//                                .put("word", "create article word from unit test")
//                                .toString()))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print())
//                .andReturn();
//    }
//
//    @Test
//    void createContent() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.POST, "/forum/article/" + ids[0])
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .cookie(authorization)
//                        .content(new JSONObject()
//                                .put("word", "create content word from unit test")
//                                .toString()))
//                .andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print())
//                .andReturn();
//    }
//
//    @Test
//    void deleteFirstContent() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.DELETE, "/forum/article/" + ids[1]+ "/0")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .cookie(authorization))
//                .andExpect(MockMvcResultMatchers.status().isNoContent())
//                .andDo(MockMvcResultHandlers.print())
//                .andReturn();
//    }
//
//    @Test
//    void deleteContent() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.DELETE, "/forum/article/" + ids[1]+ "/1")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .cookie(authorization))
//                .andExpect(MockMvcResultMatchers.status().isNoContent())
//                .andDo(MockMvcResultHandlers.print())
//                .andReturn();
//    }
//
//    @Test
//    void updateContentLike() throws Exception {
//        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
//                        .request(HttpMethod.PATCH, "/forum/article/" + ids[0]+ "/0/like")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .cookie(authorization)
//                        .content(new JSONObject()
//                                .put("like", true)
//                                .toString()))
//                .andExpect(MockMvcResultMatchers.status().isNoContent())
//                .andDo(MockMvcResultHandlers.print())
//                .andReturn();
//    }
//
//}