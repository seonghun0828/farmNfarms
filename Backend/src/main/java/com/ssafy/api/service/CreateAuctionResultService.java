package com.ssafy.api.service;


import com.ssafy.api.request.AuctionResultReq;
import com.ssafy.api.request.CreateAuctionResultReq;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.domain.auctionResult.AuctionResult;
import com.ssafy.domain.auctionResult.AuctionResultRepository;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateAuctionResultService {

    private final AuctionResultRepository auctionResultRepository;

    private final AuctionDetailRepository auctionDetailRepository;

    private final UserRepository userRepository;

    public boolean createAuctionResult(CreateAuctionResultReq request) {

        try{
        User seller = userRepository.findByPhone(request.getSellerPhoneNumber());
        User buyer = userRepository.findByPhone(request.getBuyerPhoneNumber());
        AuctionDetail auctionDetail = auctionDetailRepository.findById(request.getAuctionDetailId()).get();

        AuctionResult auctionResult = AuctionResult.builder()
                .buyer(buyer)
                .seller(seller)
                .auctionedPrice(request.getAuctionedPrice())
                .dealCompleted(false)
                .auctionDetail(auctionDetail)
                .build();

        auctionResultRepository.save(auctionResult);
        return true;

        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
