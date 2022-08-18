package com.ssafy.api.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateAuctionResultReq {

    private String sellerPhoneNumber;
    private String buyerPhoneNumber;
    private Long auctionedPrice;
    private Long auctionDetailId;

    // auctionDetailId로 조회?
    private int quantity;
    private String grade;
    private String productTitle;

}
