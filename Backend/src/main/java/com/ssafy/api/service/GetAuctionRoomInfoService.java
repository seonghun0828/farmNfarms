package com.ssafy.api.service;


import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAuctionRoomInfoService {

//    private final AuctionRoomRepository auctionRoomRepository;

//    private final AuctionDetailRepository auctionDetailRepository;


    private final AuctionRoomRepository auctionRoomRepository;


    private final AuctionDetailRepository auctionDetailRepository;

    public Page<AuctionRoom> getAuctionRoomsInfo(Pageable pageable) {

        return auctionRoomRepository.findAllByAuctionedFalse(pageable);
    }

    public List<AuctionDetail> getAuctionDetailsInfo(Long auctionRoomId) {

        return auctionDetailRepository.findAllByAuctionRoomId(auctionRoomId);
    }



}
