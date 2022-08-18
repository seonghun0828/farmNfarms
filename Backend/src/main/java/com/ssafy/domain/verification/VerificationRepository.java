package com.ssafy.domain.verification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VerificationRepository extends JpaRepository<Verification, Long> {

    List<Verification> findAllByPhoneNumber(String phoneNumber);
}
