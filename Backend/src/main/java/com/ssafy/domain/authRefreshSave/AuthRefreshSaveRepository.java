package com.ssafy.domain.authRefreshSave;

import com.ssafy.domain.auctionResult.AuctionResult;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public interface AuthRefreshSaveRepository extends JpaRepository<AuthRefreshSave, Long> {
    AuthRefreshSave findByRefreshToken(String refreshToken);
}
