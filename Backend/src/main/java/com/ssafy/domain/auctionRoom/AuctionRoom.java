package com.ssafy.domain.auctionRoom;

import com.ssafy.domain.BaseTimeEntity;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AuctionRoom extends BaseTimeEntity {

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
    private boolean auctioned;

    @Column
    private Long ownerId;

    @CreatedDate
    @Column
    private LocalDateTime createdAt;

    public AuctionRoom(String auctionRoomTitle, String auctionRoomDescription, String auctionRoomThumbnail, Long ownerId) {
        this.auctionRoomTitle = auctionRoomTitle;
        this.auctionRoomDescription = auctionRoomDescription;
        this.auctionRoomThumbnail = auctionRoomThumbnail;
        this.ownerId = ownerId;
    }
}
