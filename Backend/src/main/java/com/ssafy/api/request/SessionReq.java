package com.ssafy.api.request;


import com.fasterxml.jackson.annotation.JsonInclude;
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

    static class AuctionDetailInfo{
        private String name;
        private String val1;
        private String val2;
        private String val3;
        private String val4;
    }


    private int sessionId;
    private List<AuctionDetailInfo> auctionInfoList = new ArrayList<>();
}
