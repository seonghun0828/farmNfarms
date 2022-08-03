package com.ssafy.api.service;

import com.ssafy.api.dto.AuctionDetailDto;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class GetAuctionRoomInfoServiceTest {

    @InjectMocks
    GetAuctionRoomInfoService sut;

    @Mock
    AuctionDetailRepository auctionDetailRepository;

    @Mock
    AuctionRoomRepository auctionRoomRepository;


    @Test
    public void getAuctionDetailsInfo() {


        AuctionRoom auctionRoom = AuctionRoom.builder()
                .id(1L)
                .build();

        auctionRoomRepository.save(auctionRoom);

        AuctionDetail detail1 = AuctionDetail.builder()
                .auctionRoom(auctionRoom)
                .productTitle("title")
                .grade("grade")
                .startingPrice(1)
                .auctionedPrice(12)
                .quantity(111)
                .bidIncrement(111)
                .build();

        AuctionDetail detail2 = AuctionDetail.builder()
                .auctionRoom(auctionRoom)
                .productTitle("title")
                .grade("grade")
                .startingPrice(1)
                .auctionedPrice(12)
                .quantity(111)
                .bidIncrement(111)
                .build();

        AuctionDetail savedAuctionDetail = auctionDetailRepository.save(detail1);
        System.out.println(savedAuctionDetail);
        auctionDetailRepository.save(detail2);

        Long auctionRoomId = auctionRoom.getId();
        System.out.println(auctionRoomId);

//        List<AuctionDetail> list = sut.getAuctionDetailsInfo(auctionRoomId);

//        System.out.println(sut.getAuctionDetailsInfo(1L));
//        System.out.println(auctionDetailRepository.findAll());
//        List<AuctionDetailDto> auctionDetailRepository.findAllByAuctionRoomId(auctionRoomId);



    }
}