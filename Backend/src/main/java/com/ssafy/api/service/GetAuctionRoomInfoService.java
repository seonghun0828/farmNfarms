package com.ssafy.api.service;


import com.ssafy.api.response.AuctionRoomsInfoRes;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GetAuctionRoomInfoService {

    private final AuctionRoomRepository auctionRoomRepository;

    private final UserRepository userRepository;

    private final AuctionDetailRepository auctionDetailRepository;


    public List<AuctionDetail> getAuctionDetailsInfo(Long auctionRoomId) {

        return auctionDetailRepository.findAllByAuctionRoomIdOrderByIdAsc(auctionRoomId);
    }


    public Page<AuctionRoomsInfoRes> getAuctionRoomsByCreatedTime(Pageable pageable) {

        List<AuctionRoom> foundList = auctionRoomRepository.findAllByAuctionedFalseOrderByCreatedAtDesc();
        List<AuctionRoomsInfoRes> responseList = new ArrayList<>();
        for(AuctionRoom room : foundList) {

            Optional<User> foundUser = userRepository.findById(room.getOwnerId());

            AuctionRoomsInfoRes auctionRoomsInfoRes = AuctionRoomsInfoRes.builder()
                    .id(room.getId())
                    .ownerName(foundUser.get().getName())
                    .ownerPhoneNumber(foundUser.get().getPhone())
                    .ownerPicture(foundUser.get().getPicture().getFullPath())
                    .auctionRoomThumbnail(room.getImage().getFullPath())
                    .auctionRoomTitle(room.getAuctionRoomTitle())
                    .auctionRoomDescription(room.getAuctionRoomDescription())
                    .build();

            responseList.add(auctionRoomsInfoRes);
        }

        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());

        return new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
    }

}
