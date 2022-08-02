package com.ssafy.api.request;


import com.ssafy.api.dto.AuctionDetailReq;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class CreateAuctionRoomReq {

    private Long ownerId;
    private String title;
    private String description;
    private String thumbnail;
    private List<AuctionDetailReq> details;
}
