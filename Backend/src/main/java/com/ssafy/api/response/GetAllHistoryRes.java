package com.ssafy.api.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetAllHistoryRes {

    // from AuctionDetail
    private String productTitle;
    private String grade;
    private int quantity;

    // from AuctionResult
    private Long auctionedPrice;
    private boolean dealCompleted;
    private Long auctionResultId;

}
