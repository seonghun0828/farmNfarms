package com.ssafy.domain.verification;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Verification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    private VerificationStateType state;
    private String confirmNumber;

    public Verification(String phoneNumber, String confirmNumber) {
        this.phoneNumber = phoneNumber;
        this.confirmNumber = confirmNumber;
        this.state = VerificationStateType.PENDING;
    }

    public boolean verify(String providedNumber) {
        validate(providedNumber);

        if(!this.confirmNumber.equals(providedNumber)) {
            return false;
        }
        changeStateWhenSuccessful();
        return true;
    }

    private void changeStateWhenSuccessful() {
        state = VerificationStateType.CONFIRMED;
    }

    private void validate(String providedNumber) {
        if(providedNumber == null || providedNumber.isEmpty()) {
            throw new IllegalArgumentException("인증번호가 존재하지 않음");
        }

        if(state.equals(VerificationStateType.CONFIRMED)) {
            throw new IllegalStateException("인증정보가 올바르지 않음");
        }
    }

}
