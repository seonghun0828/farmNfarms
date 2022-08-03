/*
package com.ssafy.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@Transactional
public class UserControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    @WithAnonymousUser
    public void register() throws Exception {
        UserRegisterPostReq userRegisterPostReq = new UserRegisterPostReq();
        userRegisterPostReq.setPhone("010-0000-0000");
        userRegisterPostReq.setPassword("your_password");
        userRegisterPostReq.setName("홍길동");
        userRegisterPostReq.setAddress("협의가 필요합니다");
        userRegisterPostReq.setAccount("110-342-143345");

        mockMvc.perform(
                post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(userRegisterPostReq))
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @WithAnonymousUser
    public void withdrawal() throws Exception {
        UserRegisterPostReq userRegisterPostReq = new UserRegisterPostReq();
        userRegisterPostReq.setPhone("010-0000-0000");
        userRegisterPostReq.setPassword("your_password");
        userRegisterPostReq.setName("홍길동");
        userRegisterPostReq.setAddress("협의가 필요합니다");
        userRegisterPostReq.setAccount("110-342-143345");

        // 테스트를 위한 회원가입 데이터
        mockMvc.perform(
                post("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(userRegisterPostReq))
        );

        UserLoginPostReq userLoginPostReq = new UserLoginPostReq();
        userLoginPostReq.setPhone("010-0000-0001");
        userLoginPostReq.setPassword("your_password");

        // 탈퇴 실패
        mockMvc.perform(
                        delete("/api/v1/user")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(userLoginPostReq))
                )
                .andDo(print())
                .andExpect(status().is4xxClientError());

        userLoginPostReq.setPhone("010-0000-0000");

        // 탈퇴 성공
        mockMvc.perform(
                delete("/api/v1/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(userLoginPostReq))
                )
                .andDo(print())
                .andExpect(status().isOk());

    }

    private <T> String toJson(T data) throws JsonProcessingException {
        return objectMapper.writeValueAsString(data);
    }

}*/
