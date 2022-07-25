package com.ssafy.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.api.dto.CreateVerificationDto;
import com.ssafy.api.service.VerificationService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
@RunWith(SpringRunner.class)
public class VerificationControllerTest {

    @Autowired
    MockMvc mockMvc;

    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void createVerification() throws Exception {

        CreateVerificationDto createVerificationDto = new CreateVerificationDto();
        createVerificationDto.setPhoneNumber("01050279681");

        mockMvc.perform(
                post("/apis/verifications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(createVerificationDto))
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    public void duplicationFailTest() throws Exception {

        CreateVerificationDto createVerificationDto = new CreateVerificationDto();
        createVerificationDto.setPhoneNumber("01050279681");

        mockMvc.perform(
                        post("/apis/verifications")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(toJson(createVerificationDto))
                )
                .andDo(print())
                .andExpect(status().isOk());
    }

    private <T> String toJson(T data) throws JsonProcessingException {
        return objectMapper.writeValueAsString(data);
    }
}