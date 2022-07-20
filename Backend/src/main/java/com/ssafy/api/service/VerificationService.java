package com.ssafy.api.service;

import com.ssafy.domain.verification.Verification;
import com.ssafy.domain.verification.VerificationRepository;
import com.ssafy.util.RandomNumberGenerator;
import com.ssafy.util.SmsSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class VerificationService {

    // 생성자 주입
    private final VerificationRepository repository;
    private final RandomNumberGenerator randomNumberGenerator;

    private final SmsSender smsSender;

    public Long createVerification(String phoneNumber) {
        String confirmNumber = randomNumberGenerator.generate();
        Verification verification = new Verification(phoneNumber, confirmNumber);
        Verification savedVerification = repository.save(verification);

        smsSender.sendVerificationMessage(phoneNumber, confirmNumber);

        Long savedVerificationId = savedVerification.getId();
        return savedVerificationId;
    }

    public boolean verifyBy(Long id, String providedNumber) {
        Optional<Verification> optionalVerification = repository.findById(id);

        if (!optionalVerification.isPresent()) {
            throw new IllegalArgumentException("인증번호를 받은 이력이 존재하지 않습니다");
        }

        Verification verification = optionalVerification.get();
        return verification.verify(providedNumber);
    }

}
