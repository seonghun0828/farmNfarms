
package com.ssafy.domain.auctionDetail;

import com.ssafy.domain.auctionRoom.AuctionRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuctionDetailRepository extends JpaRepository<AuctionDetail, Long> {
/*
    @Query("SELECT r FROM AuctionDetail d JOIN d.auctionRoom r ON" +
            "SELECT d FROM d JOIN d.product p ON p.title =: product")
    List<AuctionRoom> findALlByProduct(@Param("product") String product);*/
/*

    @Query("SELECT r FROM AuctionDetail d JOIN d.auctionRoom r ON" +
            "(SELECT d from d JOIN d.product p ON p.title =: param) OR" +
            "r.title =: param")
    List<AuctionRoom> findAllByTitle(@Param("param") String param);
*/

}

