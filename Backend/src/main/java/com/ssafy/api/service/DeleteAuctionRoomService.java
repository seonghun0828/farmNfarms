package com.ssafy.api.service;

import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteAuctionRoomService {

    private final AuctionRoomRepository auctionRoomRepository;

    public boolean deleteAuctionRoom(Long auctionRoomId) {

        try{
            auctionRoomRepository.deleteById(auctionRoomId);
            return true;

        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }

    }

}
