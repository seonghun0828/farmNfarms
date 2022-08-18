package com.ssafy.api.service;

import com.ssafy.domain.verification.Verification;
import com.ssafy.domain.verification.VerificationRepository;
import com.ssafy.domain.verification.VerificationStateType;
import com.ssafy.util.RandomNumberGenerator;
import com.ssafy.util.SmsSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class VerificationService {

    // 생성자 주입
    private final VerificationRepository repository;
    private final RandomNumberGenerator randomNumberGenerator;

    private final SmsSender smsSender;

    public Long createVerification(String phoneNumber) {
        HashMap<String, String> message = randomNumberGenerator.generate();
        String confirmNumber = message.get("randomNumber");
        System.out.println(confirmNumber);

        Verification verification = new Verification(phoneNumber, confirmNumber);
        Verification savedVerification = repository.save(verification);

        String content = message.get("content");
        smsSender.sendVerificationMessage(phoneNumber, content);

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

    public boolean isDuplicated(Long id){
        String phoneNumber = repository.findById(id).get().getPhoneNumber();

        List<Verification> list = repository.findAllByPhoneNumber(phoneNumber).stream()
                .filter(a -> a.getState() == VerificationStateType.CONFIRMED)
                .collect(Collectors.toList());

        System.out.println(list.size());

        //등록인증 하려는 폰 번호로 DB에 이미 Confirmed state인 레코드가 있는지 체크 -> 있다면 중복!
        if(list.size()> 0){
            return true;
           }

        return false;
    }


}
