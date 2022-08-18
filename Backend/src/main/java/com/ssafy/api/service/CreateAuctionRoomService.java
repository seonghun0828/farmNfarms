package com.ssafy.api.service;

import com.ssafy.api.request.AuctionDetailReq;
import com.ssafy.api.request.CreateAuctionRoomReq;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import com.ssafy.domain.imgae.ImageRepository;
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

    private final ImageRepository imageRepository;

    public Long createBy(String phoneNumber, CreateAuctionRoomReq request) {

        try {
            Long foundUserId = getUserBy(phoneNumber).getId();
            AuctionRoom savedAuctionRoom = createAuctionRoom(request, foundUserId);
            addAuctionDetailToAuctionRoom(request, savedAuctionRoom);

            return savedAuctionRoom.getId();
        } catch (Exception e) {
            e.printStackTrace();
            return 0L;
        }
    }

    private User getUserBy(String phoneNumber) {
        return userRepository.findByPhone(phoneNumber);
    }

    private AuctionRoom createAuctionRoom(CreateAuctionRoomReq request, Long foundUserId) {
        AuctionRoom auctionRoom = AuctionRoom.builder()
                .ownerId(foundUserId)
                .auctionRoomTitle(request.getTitle())
                .auctionRoomDescription(request.getDescription())
                .image(imageRepository.findById(request.getThumbnail()).get())
                .auctioned(false)
                .build();

        return auctionRoomRepository.save(auctionRoom);
    }

    private void addAuctionDetailToAuctionRoom(CreateAuctionRoomReq request, AuctionRoom savedAuctionRoom) {
        for (AuctionDetailReq detail : request.getDetails()) {

            AuctionDetail auctionDetail = AuctionDetail.builder()
                    .productTitle(detail.getProductTitle())
                    .grade(detail.getGrade())
                    .quantity(detail.getQuantity())
                    .startingPrice(detail.getStartingPrice())
                    .bidIncrement(detail.getBidIncrement())
                    .auctionRoom(savedAuctionRoom)
                    .build();

            auctionDetailRepository.save(auctionDetail);
        }
    }
}
