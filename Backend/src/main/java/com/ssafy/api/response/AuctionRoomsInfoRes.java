package com.ssafy.api.response;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class AuctionRoomsInfoRes {

    private Long id;
    private String ownerName;
    private String ownerPicture;
    private String auctionRoomThumbnail;
    private String auctionRoomTitle;
    private String auctionRoomDescription;

}
