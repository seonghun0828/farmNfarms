package com.ssafy.api.controller;


import com.ssafy.api.request.CreateAuctionResultReq;
import com.ssafy.api.response.GetAllHistoryRes;
import com.ssafy.api.response.GetBuyHistoryDetailRes;
import com.ssafy.api.response.GetSellHistoryDetailRes;
import com.ssafy.api.service.CreateAuctionResultService;
import com.ssafy.api.service.HistoryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/result")
@RequiredArgsConstructor
@Api(value = "경매완료 후 결과에 대한 API", tags = {"Result"})
public class ResultController {

    private final CreateAuctionResultService createAuctionResultService;

    private final HistoryService historyService;

    @PostMapping()
    @ApiOperation(value = "경매결과 생성", notes = "전달받은 request에 따른 경매 결과를 생성합니다.")
    public ResponseEntity<HashMap<String, Boolean>> createAuctionResult(@RequestBody CreateAuctionResultReq request) {

        boolean isSuccess = createAuctionResultService.createAuctionResult(request);

        HashMap<String, Boolean> jsonMap = new HashMap<>();
        if(isSuccess) jsonMap.put("success", true);
        else jsonMap.put("success", false);


        return ResponseEntity.ok(jsonMap);
    }

    @GetMapping("/sell")
    @ApiOperation(value = "판매이력 전체조회", notes = "전달받은 유저의 phoneNumber로 판매이력을 조회합니다.")
    public ResponseEntity<List<GetAllHistoryRes>> getSellHistory(String phoneNumber) {
        return ResponseEntity.ok(historyService.getAllSellHistory(phoneNumber));
    }

    @GetMapping("/sell/detail")
    @ApiOperation(value = "판매내역 상세조회", notes = "전달받은 경매결과의 id를 통해 판매내역을 상세 조회합니다.")
    public ResponseEntity<GetSellHistoryDetailRes> getSellHistoryDetail(Long auctionResultId) {
        return ResponseEntity.ok(historyService.getSellHistoryDetail(auctionResultId));
    }

    @GetMapping("/buy")
    @ApiOperation(value = "구매이력 전체조회", notes = "전달받은 유저의 phoneNumber로 구매이력을 조회합니다.")
    public ResponseEntity<List<GetAllHistoryRes>> getBuyHistory(String phoneNumber) {
        return ResponseEntity.ok(historyService.getAllBuyHistory(phoneNumber));
    }


    @GetMapping("/buy/detail")
    @ApiOperation(value = "구매내역 상세조회", notes = "전달받은 경매결과의 id를 통해 구매내역을 상세 조회합니다.")
    public ResponseEntity<GetBuyHistoryDetailRes> getBuyHistoryDetail(Long auctionResultId) {
        return ResponseEntity.ok(historyService.getBuyHistoryDetail(auctionResultId));
    }

    @GetMapping()
    @ApiOperation(value = "상태 변경", notes = "전달받은 경매결과의 id에 해당하는 객체의 deal, delivery 상태를 업데이트합니다.")
    public ResponseEntity<HashMap<String, Boolean>> updateDeliveryAndDealState(Long auctionResultId) {
        boolean isSuccess = historyService.updateDeliveryAndDealState(auctionResultId);

        HashMap<String, Boolean> jsonMap = new HashMap<>();

        if(isSuccess) jsonMap.put("success", true);
        else jsonMap.put("success", false);
        return ResponseEntity.ok(jsonMap);

    }

}
