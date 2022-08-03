package com.ssafy.api.service;


import com.ssafy.api.dto.AuctionDetailDto;
import com.ssafy.api.request.AuctionDetailReq;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAuctionRoomInfoService {

//    private final AuctionRoomRepository auctionRoomRepository;

//    private final AuctionDetailRepository auctionDetailRepository;

    @Autowired
    private AuctionRoomRepository auctionRoomRepository;

    @Autowired
    private AuctionDetailRepository auctionDetailRepository;

    public List<AuctionRoom> getAuctionRoomsInfo() {

        return auctionRoomRepository.findAllByAuctionedFalse();
    }

    public List<AuctionDetail> getAuctionDetailsInfo(Long auctionRoomId) {

        return auctionDetailRepository.findAllByAuctionRoomId(auctionRoomId);
    }



}
