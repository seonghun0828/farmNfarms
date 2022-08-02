package com.ssafy.api.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuctionDetailReq {

//    private boolean auctioned;
//    private int initPrice;
    private int quantity;
    private int startingPrice;
    private int bidIncrement;
    private int auctionedPrice;

    //Product
    private String productTitle;
    // Grade
    private String gradeTitle;
}
