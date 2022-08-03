package com.ssafy.api.dto;


import lombok.ToString;

public interface AuctionDetailDto {

    Integer getQuantity();
    Integer getStartingPrice();
    Integer getBidIncrement();
    Integer getAuctionedPrice();
    String getProductTitle();
    String getGrade();
    Long getAuctionRoomId();

}
