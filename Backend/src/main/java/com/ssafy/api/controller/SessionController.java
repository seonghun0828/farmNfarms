package com.ssafy.api.controller;


import com.ssafy.api.request.SessionReq;
import com.ssafy.api.service.SessionService;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/apis")
@Api(value = "경매방 API",  tags = {"Room"})
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/create-room/{phoneNumber}")
    @ApiOperation(value = "방 생성", notes = "방 생성 정보를 받아 저장하고, kms를 통해 token을 전달한다.")
    @ApiImplicitParams(
            @ApiImplicitParam(name="sessionInfo", value = "경매방 생성 정보")
    )
    public ResponseEntity<JSONObject> createRoom(
            @PathVariable String phoneNumber,
            @RequestBody SessionReq sessionInfo){

        return sessionService.createRoom(phoneNumber, sessionInfo);
    }

    @GetMapping("/search")
    public ResponseEntity<List<AuctionRoom>> retrieveRoom(
            @RequestParam() String mode,
            @RequestParam() String key
    ){
        HashMap<String ,String> params = new HashMap<>();
        params.put("mode", mode);
        params.put("key", key);

        return ResponseEntity.ok(sessionService.search(params)) ;
    }

    }
