package com.ssafy.api.controller;

import com.ssafy.api.dto.ConfirmVerificationDto;
import com.ssafy.api.dto.CreateVerificationDto;
import com.ssafy.api.service.VerificationService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
@Api(value = "휴대폰 인증 API", tags = {"Verification"})
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping("/verifications")
    @ApiOperation(value = "인증 객체 생성", notes = "입력된 휴대전화을 통해 인증 번호를 발송한다.")

    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<Long> createVerification(@RequestBody CreateVerificationDto createVerificationDto) {
        Long verificationId = verificationService.createVerification(createVerificationDto.getPhoneNumber());
        return ResponseEntity.ok(verificationId);
    }

    @PostMapping("verifications/{id}")
    @ApiOperation(value = "인증 번호 입력", notes = "발송된 인증 번호를 입력하여 휴대폰 인증 과정을 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "번호 중복"),
            @ApiResponse(code = 402, message = "인증 실패")
    })
    public ResponseEntity<Map<String, Integer>> confirmVerification(@PathVariable Long id, @RequestBody ConfirmVerificationDto confirmVerificationDto) {

        boolean isDuplicated = verificationService.isDuplicated(id);
        boolean isConfirmed = verificationService.verifyBy(id, confirmVerificationDto.getConfirmNumber());
        Map<String, Integer> jsonMap = new HashMap<>();


        // 0이면 success, 0보다 크면 fail
        // 1 이면 중복 fail
        // 2 이면 인증코드 fail

        if(isDuplicated) {
            jsonMap.put("isSuccess", 401);
            return ResponseEntity.ok(jsonMap);
        }
        else if(!isConfirmed){
            jsonMap.put("isSuccess",402);
            return ResponseEntity.ok(jsonMap);
        }

        jsonMap.put("isSuccess",200);
        return ResponseEntity.ok(jsonMap);
    }
}
