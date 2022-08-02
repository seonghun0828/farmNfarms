package com.ssafy.api.controller;


import com.ssafy.api.request.CreateAuctionRoomReq;
import com.ssafy.api.response.CreateAuctionRoomRes;
import com.ssafy.api.service.CreateAuctionRoomService;
import com.ssafy.api.service.SessionService;
import com.ssafy.api.dto.AuctionRoomDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "경매방 API",  tags = {"Room"})
@Slf4j
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private CreateAuctionRoomService createAuctionRoomService;

    @PostMapping("/create-room/{phoneNumber}")
    @ApiOperation(value = "방 생성", notes = "방 생성 정보를 받아 저장하고, kms 를 통해 token을 전달한다.")
    public ResponseEntity<?> createRoom(
            @PathVariable String phoneNumber,
            @RequestBody CreateAuctionRoomReq createAuctionRoomReq){

        boolean isCreated = createAuctionRoomService.createBy(phoneNumber, createAuctionRoomReq);
        CreateAuctionRoomRes res = new CreateAuctionRoomRes();
        res.setSuccess(isCreated);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AuctionRoomDto>> retrieveRoom(
            @RequestParam() String mode,
            @RequestParam() String key
    ){
        HashMap<String ,String> params = new HashMap<>();
        params.put("mode", mode);
        params.put("key", key);

        return ResponseEntity.ok(sessionService.search(params)) ;
    }

    }
