package com.ssafy.api.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetBuyHistoryDetailRes {

    // 품목
    private String productTitle;
    private String grade;
    private int quantity;
    private Long auctionedPrice;

    // 유저 정보
    private String sellerName;
    private String sellerPhoneNumber;
    private String sellerBank;
    private String sellerAccount;
    private LocalDateTime createAt;

    // 경매 정보
    private boolean deliveryCompleted;
    private boolean paymentCompleted;

}
