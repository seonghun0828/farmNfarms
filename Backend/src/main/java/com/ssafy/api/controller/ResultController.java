package com.ssafy.api.controller;


import com.ssafy.api.request.CreateAuctionResultReq;
import com.ssafy.api.service.CreateAuctionResultService;
import com.ssafy.domain.auctionResult.AuctionResultRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/result")
@RequiredArgsConstructor
@Api(value = "경매완료 후 결과에 대한 API", tags = {"Result"})
public class ResultController {

    private final CreateAuctionResultService createAuctionResultService;

    @PostMapping()
    @ApiOperation(value = "경매결과 생성", notes = "전달받은 request에 따른 경매 결과를 생성합니다.")
    public ResponseEntity<HashMap<String, Boolean>> createAuctionResult(@RequestBody CreateAuctionResultReq request) {

        boolean isSuccess = createAuctionResultService.createAuctionResult(request);

        HashMap<String, Boolean> jsonMap = new HashMap<>();
        if(isSuccess) jsonMap.put("success", true);
        else jsonMap.put("success", false);


        return ResponseEntity.ok(jsonMap);
    }
}
