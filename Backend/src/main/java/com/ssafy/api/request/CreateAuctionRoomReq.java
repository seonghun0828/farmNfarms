package com.ssafy.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@ApiModel("CreateAuctionRoomReq")
public class CreateAuctionRoomReq {

//    private Long ownerId;
    private String title;
    private String description;
    @ApiModelProperty(name = "사진 idx", example = "1")
    private Long thumbnail;
    private List<AuctionDetailReq> details;
//    private boolean auctioned;
}
