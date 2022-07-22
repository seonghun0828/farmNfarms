package com.ssafy.api.controller;

import com.ssafy.api.dto.ConfirmVerificationDto;
import com.ssafy.api.dto.CreateVerificationDto;
import com.ssafy.api.service.VerificationService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping("/verifications")
    @ApiOperation(value = "인증을 만든다.", notes = "인증을 만든다니까요")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "유저 아이디", required = true),
            @ApiImplicitParam(name = "name", value = "유저 이름", required = true)
    })
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<Long> createVerification(@RequestBody CreateVerificationDto createVerificationDto) {
        Long verificationId = verificationService.createVerification(createVerificationDto.getPhoneNumber());
        return ResponseEntity.ok(verificationId);
    }

    @PostMapping("verifications/{id}")
    public ResponseEntity<Boolean> confirmVerification(@PathVariable Long id, @RequestBody ConfirmVerificationDto confirmVerificationDto) {

        boolean isConfirmed = verificationService.verifyBy(id, confirmVerificationDto.getConfirmNumber());
        return ResponseEntity.ok(isConfirmed);

    }
}
