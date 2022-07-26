package com.ssafy.domain.userAuctionRoom;

import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class UserAuctionRoom {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUCTION_ROOM_ID")
    AuctionRoom auctionRoom;
}
