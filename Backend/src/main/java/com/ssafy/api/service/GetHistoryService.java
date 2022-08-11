package com.ssafy.api.service;

import com.ssafy.api.response.GetAllHistoryRes;
import com.ssafy.api.response.GetBuyHistoryDetailRes;
import com.ssafy.api.response.GetSellHistoryDetailRes;
import com.ssafy.domain.auctionResult.AuctionResult;
import com.ssafy.domain.auctionResult.AuctionResultRepository;
import com.ssafy.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetHistoryService {

    private final AuctionResultRepository auctionResultRepository;

    public List<GetAllHistoryRes> createList(List<AuctionResult> auctionResultList) {

        List<GetAllHistoryRes> historyResList = new ArrayList<>();

        for(AuctionResult result : auctionResultList) {
            GetAllHistoryRes getAllHistoryRes = GetAllHistoryRes.builder()
                    .productTitle(result.getAuctionDetail().getProductTitle())
                    .grade(result.getAuctionDetail().getGrade())
                    .quantity(result.getAuctionDetail().getQuantity())
                    .auctionedPrice(result.getAuctionedPrice())
                    .auctionResultId(result.getId())
                    .dealCompleted(result.isDealCompleted())
                    .build();

        historyResList.add(getAllHistoryRes);
        }

        return historyResList;
    }


    // 판매내역 전체조회
    public List<GetAllHistoryRes> getAllSellHistory(String phoneNumber) {

        List<AuctionResult> auctionResultList = auctionResultRepository.findAllBySeller_Phone(phoneNumber);

        return createList(auctionResultList);

    }
    // 구매내역 전체조회
    public List<GetAllHistoryRes> getAllBuyHistory(String phoneNumber) {

        List<AuctionResult> auctionResultList = auctionResultRepository.findAllByBuyer_Phone(phoneNumber);

        return createList(auctionResultList);

    }

    // 판매내역 상세조회
    public GetSellHistoryDetailRes getSellHistoryDetail(Long auctionResultId) {

        AuctionResult auctionResult = auctionResultRepository.findById(auctionResultId).get();

        GetSellHistoryDetailRes res = GetSellHistoryDetailRes.builder()
                .productTitle(auctionResult.getAuctionDetail().getProductTitle())
                .grade(auctionResult.getAuctionDetail().getGrade())
                .quantity(auctionResult.getAuctionDetail().getQuantity())
                .auctionedPrice(auctionResult.getAuctionedPrice())
                .buyerName(auctionResult.getBuyer().getName())
                .buyerPhoneNumber(auctionResult.getBuyer().getPhone())
                .buyerAddress(auctionResult.getBuyer().getAddress())
                .build();

        return res;

    }


    //구매내역 상세조회
    public GetBuyHistoryDetailRes getBuyHistoryDetail(Long auctionResultId) {

        AuctionResult auctionResult = auctionResultRepository.findById(auctionResultId).get();

        GetBuyHistoryDetailRes res = GetBuyHistoryDetailRes.builder()
                .productTitle(auctionResult.getAuctionDetail().getProductTitle())
                .grade(auctionResult.getAuctionDetail().getGrade())
                .quantity(auctionResult.getAuctionDetail().getQuantity())
                .auctionedPrice(auctionResult.getAuctionedPrice())
                .sellerName(auctionResult.getSeller().getName())
                .sellerPhoneNumber(auctionResult.getSeller().getPhone())
                .sellerBank(auctionResult.getSeller().getBank())
                .sellerAccount(auctionResult.getSeller().getAccount())
                .build();

        return res;

    }


}
