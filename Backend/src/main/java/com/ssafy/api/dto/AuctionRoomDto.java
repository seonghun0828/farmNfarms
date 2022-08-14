package com.ssafy.api.dto;


public interface AuctionRoomDto {
    Long getId();
    String getAuctionRoomTitle();
    String getAuctionRoomDescription();
    Long getThumbnailId();
    Long getOwnerId();
}
