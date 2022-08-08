package com.ssafy.domain.auctionResult;


import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AuctionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name ="AUCTION_DETAIL_ID")
    private AuctionDetail auctionDetail;

    @ManyToOne
    @JoinColumn(name = "SELLER_ID")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "BUYER_ID")
    private  User buyer;

    @Column
    private boolean dealCompleted;

    @Column
    private long auctionedPrice;
}
