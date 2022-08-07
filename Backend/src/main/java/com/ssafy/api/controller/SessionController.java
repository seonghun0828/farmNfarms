package com.ssafy.api.controller;


import com.ssafy.api.request.CreateAuctionRoomReq;
import com.ssafy.api.response.AuctionRoomsInfoRes;
import com.ssafy.api.response.CreateAuctionRoomRes;
import com.ssafy.api.response.FileInfoRes;
import com.ssafy.api.service.CreateAuctionRoomService;
import com.ssafy.api.service.GetAuctionRoomInfoService;
import com.ssafy.api.service.FileService;
import com.ssafy.api.service.SessionService;
import com.ssafy.api.dto.AuctionRoomDto;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@Api(value = "경매방 API",  tags = {"Room"})
@Slf4j
@AllArgsConstructor
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private FileService fileService;

    private final CreateAuctionRoomService createAuctionRoomService;


    private final GetAuctionRoomInfoService getAuctionRoomInfoService;


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


    @PostMapping("/save/img")
    @ApiOperation(value = "이미지 저장", notes = "이미지 DB 저장 후, idx 반환")
    public ResponseEntity<Long> saveImg(@RequestParam MultipartFile img){
        return new ResponseEntity<>(fileService.fileSave(img), HttpStatus.OK);
    }

    @PostMapping("/load/img")
    @ApiOperation(value = "이미지 로드", notes = "idx를 통해 DB에서 해당하는 이미지 경로, 타입 반환")
    public ResponseEntity<FileInfoRes> uploadImg(@RequestParam Long idx){
        return new ResponseEntity<>(fileService.fileUpload(idx), HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity<List<AuctionRoomDto>> retrieveRoom(
            @RequestParam() String mode,
            @RequestParam() String key
    ){
        HashMap<String ,String> params = new HashMap<>();
        params.put("mode", mode);
        params.put("key", key);

        return ResponseEntity.ok(sessionService.search(params));
    }

    /*@GetMapping()
    @ApiOperation(value = "방 전체 조회", notes = "현재 진행 중인 (auctioned가 false인) 경매 방만 조회합니다.")
    public ResponseEntity<Page<AuctionRoom>> getAuctionRoomsInfo(@RequestParam(value = "page") int page) {
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(getAuctionRoomInfoService.getAuctionRoomsInfo(pageable));
    }*/
    @GetMapping()
    @ApiOperation(value = "경매 방 최신 순으로 전체 조회", notes="현재 진행 중인 경매방 중 생성 날짜가 최신인 순으로 조회합니다.")
    public ResponseEntity<Page<AuctionRoomsInfoRes>> getAuctionRoomsByCreatedTime(@RequestParam(value = "page") int page) {
        Pageable pageable = PageRequest.of(page, 6);
        return ResponseEntity.ok(getAuctionRoomInfoService.getAuctionRoomsByCreatedTime(pageable));
    }

    @GetMapping("/details/{roomNumber}")
    @ApiOperation(value = "방 상세 정보 조회", notes = "roomNumber에 해당하는 방의 상세정보를 조회합니다.")
    public ResponseEntity<List<AuctionDetail>> getAuctionDetailsInfo(@PathVariable Long roomNumber) {
        return ResponseEntity.ok(getAuctionRoomInfoService.getAuctionDetailsInfo(roomNumber));
    }

}
