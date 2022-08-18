package com.ssafy.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetSellHistoryDetailRes {

    // 품목
    private String productTitle;
    private String grade;
    private int quantity;
    private Long auctionedPrice;

    // 유저 정보
    private String buyerName;
    private String buyerPhoneNumber;
    private String buyerAddress;
    private String buyerDetailAddress;

    // 경매 정보
    private boolean deliveryCompleted;
    private boolean paymentCompleted;


}
