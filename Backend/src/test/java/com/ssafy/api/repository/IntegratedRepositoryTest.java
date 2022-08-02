package com.ssafy.api.repository;

import com.ssafy.domain.XXXauction.Auction;
import com.ssafy.domain.XXXauction.AuctionRepository;
import com.ssafy.domain.product.ProductRepository;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.Assert.assertThat;

@SpringBootTest
public class IntegratedRepositoryTest {
    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    ProductRepository productRepository;

    @Test
    public void tt() {
        Optional<Auction> auction = auctionRepository.findById(1L);
        boolean actual = auction.isPresent();

        System.out.println(actual);
    }
}
