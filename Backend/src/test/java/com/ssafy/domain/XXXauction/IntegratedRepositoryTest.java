package com.ssafy.domain.XXXauction;

import com.ssafy.api.dto.AuctionDetailDto;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@RunWith(SpringRunner.class)
public class IntegratedRepositoryTest {

    @Autowired
    AuctionRoomRepository auctionRoomRepository;

    @Autowired
    AuctionDetailRepository auctionDetailRepository;


    @Test
    public void test() {
        AuctionRoom room = AuctionRoom.builder().build();

        AuctionRoom savedRoom = auctionRoomRepository.save(room);

        AuctionDetail auctionDetail = AuctionDetail.builder()
                .auctionRoom(savedRoom)
                .build();

        auctionDetailRepository.save(auctionDetail);
    }

    @Test
    public void tt() {

//        Optional<AuctionRoom> auction = auc
//        boolean actual = auction.isPresent();
//        System.out.println(actual);


        AuctionRoom auctionRoom = AuctionRoom.builder()
                .id(1L)
                .auctionRoomTitle("title")
                .auctionRoomDescription("desc")
                .auctionRoomThumbnail("thumbnail")
                .auctioned(false)
                .ownerId(1L)
                .build();

        auctionRoomRepository.save(auctionRoom);

        AuctionDetail detail1 = AuctionDetail.builder()
                .auctionRoom(auctionRoom)
                .build();

        AuctionDetail detail2 = AuctionDetail.builder()
                .auctionRoom(auctionRoom)
                .build();

        auctionDetailRepository.save(detail1);
        auctionDetailRepository.save(detail2);

        Long auctionRoomId = auctionRoom.getId();

        int s = auctionDetailRepository.findAllByAuctionRoomId(auctionRoomId).size();
        System.out.println(s);

//        List<AuctionDetailDto> auctionDetailRepository.findAllByAuctionRoomId(auctionRoomId);

        System.out.println(detail1.getAuctionRoom().getId());
        System.out.println(detail2.getAuctionRoom().getId());

    }
}
