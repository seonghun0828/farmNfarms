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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_ID")
    private User user;

    @Column(nullable = false)
    private String auctionRoomTitle;
    @Column(nullable = false)
    private String auctionRoomDescription;
    @Column(nullable = false)
    private String auctionRoomThumbnail;

    @OneToMany(mappedBy = "auctionRoom")
    List<UserAuctionRoom> userAuctionRooms = new ArrayList<>();

    @OneToMany(mappedBy = "auctionRoom")
    List<AuctionDetail> auctionDetails = new ArrayList<>();


    public AuctionRoom(User user, String auctionRoomTitle, String auctionRoomDescription, String auctionRoomThumbnail) {
        this.user = user;
        this.auctionRoomTitle = auctionRoomTitle;
        this.auctionRoomDescription = auctionRoomDescription;
        this.auctionRoomThumbnail = auctionRoomThumbnail;
    }
}
