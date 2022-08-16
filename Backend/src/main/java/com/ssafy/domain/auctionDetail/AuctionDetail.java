package com.ssafy.domain.auctionDetail;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.domain.auctionResult.AuctionResult;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class AuctionDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUCTION_ROOM_ID")
    @JsonIgnore
    private AuctionRoom auctionRoom;

    @Column
    private String productTitle;

    @Column
    private String grade;

    @Column
    private int bidIncrement;

    @Column
    private int startingPrice;

    @Column
    private int quantity;


}
