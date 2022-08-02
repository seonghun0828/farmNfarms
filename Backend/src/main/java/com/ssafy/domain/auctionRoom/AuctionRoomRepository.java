
package com.ssafy.domain.auctionRoom;

import com.ssafy.api.dto.AuctionRoomDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AuctionRoomRepository extends JpaRepository<AuctionRoom, Long> {

    @Query(value ="select r.id id, " +
            "r.auction_room_title auctionRoomTitle," +
            "r.auction_room_description auctionRoomDescription, " +
            "r.auction_room_thumbnail auctionRoomThumbnail," +
            "r.owner_id ownerId " +
            "from auction_room r where r.auction_room_title like CONCAT('%', :title, '%')", nativeQuery = true)
    List<AuctionRoomDto> findAllByAuctionRoomTitle(@Param("title")String title);

}

