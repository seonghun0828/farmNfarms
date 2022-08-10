package com.ssafy.domain.auctionResult;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionResult implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name ="AUCTION_DETAIL_ID")
    private AuctionDetail auctionDetail;

    @ManyToOne
    @JoinColumn(name = "SELLER_ID")
    @JsonIgnore
    private User seller;

    @ManyToOne
    @JoinColumn(name = "BUYER_ID")
    @JsonIgnore
    private  User buyer;

    @Column
    private boolean dealCompleted;

    @Column
    private Long auctionedPrice;
}
