package com.ssafy.api.service;


import com.ssafy.api.response.AuctionRoomsInfoRes;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetAuctionRoomInfoService {

//    private final AuctionRoomRepository auctionRoomRepository;

//    private final AuctionDetailRepository auctionDetailRepository;


    private final AuctionRoomRepository auctionRoomRepository;

    private final UserRepository userRepository;

    private final AuctionDetailRepository auctionDetailRepository;

    public Page<AuctionRoom> getAuctionRoomsInfo(Pageable pageable) {

        return auctionRoomRepository.findAllByAuctionedFalse(pageable);
    }

    public List<AuctionDetail> getAuctionDetailsInfo(Long auctionRoomId) {

        return auctionDetailRepository.findAllByAuctionRoomId(auctionRoomId);
    }


    public List<AuctionRoomsInfoRes> getAuctionRoomsByCreatedTime() {

        List<AuctionRoom> foundList = auctionRoomRepository.findTop6ByAuctionedFalseOrderByCreatedAtDesc();
        List<AuctionRoomsInfoRes> responseList = new ArrayList<>();

        for(AuctionRoom room : foundList) {

            Optional<User> foundUser = userRepository.findById(room.getOwnerId());

            AuctionRoomsInfoRes auctionRoomsInfoRes = AuctionRoomsInfoRes.builder()
                    .ownerName(foundUser.get().getName())
                    .ownerPicture(foundUser.get().getPicture())
                    .auctionRoomThumbnail(room.getAuctionRoomThumbnail())
                    .auctionRoomTitle(room.getAuctionRoomTitle())
                    .build();

            responseList.add(auctionRoomsInfoRes);

        }
        return responseList;
    }

}