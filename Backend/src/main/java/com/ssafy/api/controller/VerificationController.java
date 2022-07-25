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
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping("/verifications")
    @ApiOperation(value = "인증을 만든다.", notes = "인증을 만든다니까요")

    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<Long> createVerification(@RequestBody CreateVerificationDto createVerificationDto) {
        Long verificationId = verificationService.createVerification(createVerificationDto.getPhoneNumber());
        return ResponseEntity.ok(verificationId);
    }

    @PostMapping("verifications/{id}")
    public ResponseEntity<Map<String, Integer>> confirmVerification(@PathVariable Long id, @RequestBody ConfirmVerificationDto confirmVerificationDto) {

        boolean isDuplicated = verificationService.isDuplicated(id);
        boolean isConfirmed = verificationService.verifyBy(id, confirmVerificationDto.getConfirmNumber());
        Map<String, Integer> jsonMap = new HashMap<>();


        // 0이면 success, 0보다 크면 fail
        // 1 이면 중복 fail
        // 2 이면 인증코드 fail

        if(isDuplicated) {
            jsonMap.put("isSuccess", 1);
            return ResponseEntity.ok(jsonMap);
        }
        else if(!isConfirmed){
            jsonMap.put("isSuccess",2);
            return ResponseEntity.ok(jsonMap);
        }

        jsonMap.put("isSuccess",0);
        return ResponseEntity.ok(jsonMap);
    }
}
