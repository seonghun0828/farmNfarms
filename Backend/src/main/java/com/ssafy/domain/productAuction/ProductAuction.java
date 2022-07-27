package com.ssafy.domain.productAuction;

import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.grade.Grade;
import com.ssafy.domain.product.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ProductAuction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUCTION_ROOM_ID")
    private AuctionRoom auctionRoom;
/*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GRADE_ID")
    private Grade grade;*/

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;




    @Column
    private boolean isAuctioned;

    @Column
    private int initPrice;

    @Column
    private int bidIncrement;

    @Column
    private int auctionedPrice;

    @Column
    private int quantity;

}
