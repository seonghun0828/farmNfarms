package com.ssafy.api.controller;


import com.ssafy.api.request.AuctionResultReq;
import com.ssafy.api.response.PayApprovalRes;
import com.ssafy.api.response.PayReadyRes;
import com.ssafy.api.service.PayService;
import com.ssafy.api.vo.PayApprovalVO;
import com.ssafy.domain.auctionResult.AuctionResult;
import com.ssafy.domain.auctionResult.AuctionResultRepository;
import io.swagger.annotations.Api;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/pay")
@Api(value = "결제 API",  tags = {"Pay"})
public class PayController {

    PayService payService;

    PayApprovalVO payApprovalVO;

    @Autowired
    AuctionResultRepository auctionResultRepository;

    //결제 준비 -> 결제 버튼 누를 때 경매 완료 정보를 받아와야함.
    @PostMapping()
    public void payReady(HttpServletResponse res, @RequestBody AuctionResultReq auctionResultReq) throws IOException {

        Optional<AuctionResult> auctionResult = auctionResultRepository.findById(auctionResultReq.getAuctionResultId());
        //헤더에 인증 키 + 구매 정보 기입
        PayReadyRes payReadyRes = payService.payReady(auctionResult.get());

        //여기에 auctionResult.get 을 통해 가져와서 넣어줘야함.
        payApprovalVO = new PayApprovalVO(
                "cid",
                payReadyRes.getTid(),
                "주문 번호",
                "고객 번호"
        );
        res.sendRedirect(payReadyRes.getNext_redirect_mobile_url());

    }

    @GetMapping("/success")
    public ResponseEntity<PayApprovalRes> paySuccess(HttpServletResponse res, @RequestParam String pg_token){

        PayApprovalRes payApprovalRes = payService.paySuccess(payApprovalVO, pg_token);
        return ResponseEntity.ok(payApprovalRes);
    }



}
