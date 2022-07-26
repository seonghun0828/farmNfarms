package com.ssafy.api.request;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.api.dto.ProductAuctionDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class SessionReq {

    private String auctionRoomTitle;
    private String roomDescription;
    private String auctionRoomThumbnail;

    private List<ProductAuctionDto> auctionInfoList = new ArrayList<>();
}
