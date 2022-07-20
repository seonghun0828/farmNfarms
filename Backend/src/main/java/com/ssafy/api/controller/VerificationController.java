package com.ssafy.api.controller;

import com.ssafy.api.dto.ConfirmVerificationDto;
import com.ssafy.api.dto.CreateVerificationDto;
import com.ssafy.api.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apis")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    @PostMapping("/verifications")
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
