
package com.ssafy.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.api.request.SessionGetTokenReq;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class SessionControllerTest {

    @Autowired //이거 Autowired 안넣으면 Configurer 가 objectMapper 못찾아서 JUit test 중, nullpointException 띄워버린다.
    //ojbectMapper란? -> JS에서 JSON.parse, JSON.Stringify 하는 것처럼 JSON <-> String 변환 매핑해주는 객체.
    ObjectMapper objectMapper;

    @Autowired
    MockMvc mockMvc;

    @Test
    @WithAnonymousUser
    public void getToken() throws Exception {

        SessionGetTokenReq tokenReq = new SessionGetTokenReq();
        tokenReq.setSessionId(1);

        String content = objectMapper.writeValueAsString(tokenReq);

        mockMvc.perform(
                post("/apis/get-token/{phoneNumber}","01024689644")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        ).andExpect(status().isOk())
                .andDo(print());
    }
}

