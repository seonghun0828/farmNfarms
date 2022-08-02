package com.ssafy.api.service;

import com.ssafy.api.dto.AuctionDetailReq;
import com.ssafy.api.request.CreateAuctionRoomReq;
import com.ssafy.api.response.CreateAuctionRoomRes;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateAuctionRoomService {

    private final AuctionRoomRepository auctionRoomRepository;
    private final UserRepository userRepository;
    private final AuctionDetailRepository auctionDetailRepository;

    public boolean createBy(String phoneNumber, CreateAuctionRoomReq request) {
//        CreateAuctionRoomRes response = new CreateAuctionRoomRes();

        try {
            Long foundUserId = getUserBy(phoneNumber).getId();
            AuctionRoom savedAuctionRoom = createAuctionRoom(request, foundUserId);
            addAuctionDetailToAuctionRoom(request, savedAuctionRoom);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private User getUserBy(String phoneNumber) {
        return userRepository.findByPhone(phoneNumber);
    }

    private AuctionRoom createAuctionRoom(CreateAuctionRoomReq request, Long foundUserId) {
        AuctionRoom auctionRoom = AuctionRoom.builder()
                .owner_id(foundUserId)
                .auctionRoomTitle(request.getTitle())
                .auctionRoomDescription(request.getDescription())
                .auctionRoomThumbnail(request.getThumbnail())
                .build();

        return auctionRoomRepository.save(auctionRoom);
    }

    private void addAuctionDetailToAuctionRoom(CreateAuctionRoomReq request, AuctionRoom savedAuctionRoom) {
        for (AuctionDetailReq detail : request.getDetails()) {

            AuctionDetail auctionDetail = AuctionDetail.builder()
                    .productTitle(detail.getProductTitle())
                    .grade(detail.getGradeTitle())
                    .quantity(detail.getQuantity())
                    .startingPrice(detail.getStartingPrice())
                    .bidIncrement(detail.getBidIncrement())
                    .auctionedPrice(detail.getAuctionedPrice())
                    .auctionRoom(savedAuctionRoom)
                    .build();

            auctionDetailRepository.save(auctionDetail);
        }
    }
}
