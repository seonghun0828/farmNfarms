package com.ssafy.domain.XXXauction;

import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

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

}