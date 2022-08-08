package com.ssafy.api.controller;


import com.ssafy.api.request.AuctionResultReq;
import com.ssafy.api.response.PayApprovalRes;
import com.ssafy.api.response.PayReadyRes;
import com.ssafy.api.service.PayService;
import com.ssafy.api.vo.PayApprovalVO;
import com.ssafy.domain.auctionResult.AuctionResult;
import com.ssafy.domain.auctionResult.AuctionResultRepository;
import com.ssafy.domain.user.User;
import io.swagger.annotations.Api;
import org.apache.http.client.RedirectException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/pay")
@Api(value = "결제 API",  tags = {"Pay"})
public class PayController {

    @Autowired
    PayService payService;

    PayApprovalVO payApprovalVO;
    AuctionResult auctionResult;
    @Autowired
    AuctionResultRepository auctionResultRepository;

    //결제 준비 -> 결제 버튼 누를 때 경매 완료 정보를 받아와야함.
    @PostMapping()
    public boolean payReady(HttpServletResponse res, @RequestBody AuctionResultReq auctionResultReq) throws IOException {

        auctionResult = auctionResultRepository.findById(auctionResultReq.getAuctionResultId()).get();

        //헤더에 인증 키 + 구매 정보 기입
        PayReadyRes payReadyRes = payService.payReady(auctionResult);

        System.out.println(payReadyRes.toString());
        //여기에 auctionResult.get 을 통해 가져와서 넣어줘야함.
        payApprovalVO = new PayApprovalVO(
                "TC0ONETIME",
                payReadyRes.getTid(),
                String.valueOf(auctionResult.getId()),
                String.valueOf(auctionResult.getBuyer().getId())
        );

        try{
            res.sendRedirect(payReadyRes.getNext_redirect_mobile_url());
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    @GetMapping("/success")
    public ResponseEntity<PayApprovalRes> paySuccess(HttpServletResponse res, @RequestParam String pg_token) {

        System.out.println("token : " + pg_token);
        ResponseEntity<PayApprovalRes> payApprovalRes = payService.paySuccess(payApprovalVO, pg_token);
        System.out.println(payApprovalRes.toString());

        auctionResult.setDealCompleted(true);
        auctionResultRepository.save(auctionResult);
        return payApprovalRes;
    }


}
