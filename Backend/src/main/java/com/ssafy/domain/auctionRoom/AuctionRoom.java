package com.ssafy.domain.auctionRoom;

import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.userAuctionRoom.UserAuctionRoom;
import com.ssafy.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class AuctionRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String auctionRoomTitle;
    @Column(nullable = false)
    private String auctionRoomDescription;
    @Column(nullable = false)
    private String auctionRoomThumbnail;

    @Column
    private String owner_id;

    public AuctionRoom(String auctionRoomTitle, String auctionRoomDescription, String auctionRoomThumbnail, String owner_id) {
        this.auctionRoomTitle = auctionRoomTitle;
        this.auctionRoomDescription = auctionRoomDescription;
        this.auctionRoomThumbnail = auctionRoomThumbnail;
        this.owner_id = owner_id;
    }
}
