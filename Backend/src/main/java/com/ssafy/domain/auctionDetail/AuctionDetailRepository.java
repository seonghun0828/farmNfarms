
package com.ssafy.domain.auctionDetail;

import com.ssafy.domain.auctionRoom.AuctionRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuctionDetailRepository extends JpaRepository<AuctionDetail, Long> {

    @Query("select d.auctionRoom r from AuctionDetail d where d.productTitle =:product")
    List<AuctionRoom> findAllByProduct(@Param("product") String product);

}

