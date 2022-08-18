package com.ssafy.domain.auctionResult;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AuctionResultRepository extends JpaRepository<AuctionResult, Long> {

    List<AuctionResult> findAllBySeller_Phone(@Param(value = "phoneNumber") String phoneNumber);

    List<AuctionResult> findAllByBuyer_Phone(@Param(value = "phoneNumber") String phoneNumber);
    Optional<AuctionResult> findById(Long id);
}
