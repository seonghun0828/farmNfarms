package com.ssafy.api.service;

import com.ssafy.api.response.PayApprovalRes;
import com.ssafy.api.response.PayReadyRes;
import com.ssafy.api.vo.PayApprovalVO;
import com.ssafy.domain.auctionResult.AuctionResult;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@Service
public class PayService {


    private static final String HOST ="https://kapi.kakao.com";
    private static final String ADMIN = "2a41078784061729125c9a7ed5e60a10";
    private static final String DOMAIN = "https://i7b203.p.ssafy.io/api/v1/pay";


    public PayReadyRes payReady(AuctionResult auctionResult){

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization","KaKaoAK " + ADMIN);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type",MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("partner_order_id","주문번호 xx");
        params.add("partner_user_id","주문자 xxx");
        params.add("item_name","potato");
        params.add("quantity", "100");
        params.add("total_amount", "1000");
        params.add("tax_free_amount", "1500");
        params.add("approval_url",DOMAIN+"/success");
        params.add("approval_url",DOMAIN+"/cancel");
        params.add("approval_url",DOMAIN+"/fail");

        HttpEntity<MultiValueMap<String, String>> body =
                new HttpEntity<MultiValueMap<String,String>>(params, headers);

        try{
            return restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, com.ssafy.api.response.PayReadyRes.class);
        }
        catch (URISyntaxException e){
            e.printStackTrace();
        }
        return null;
    }


    public PayApprovalRes paySuccess(PayApprovalVO payApprovalVO, String pg_token) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization","KaKaoAK " + ADMIN);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type",MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", payApprovalVO.getCid());
        params.add("tid", payApprovalVO.getTid());
        params.add("partner_order_id",payApprovalVO.getPartner_order_id());
        params.add("partner_user_id",payApprovalVO.getPartner_user_id());
        params.add("pg_token",pg_token);

        HttpEntity<MultiValueMap<String,String>> body
                = new HttpEntity<>(params, headers);

        return restTemplate.postForObject(DOMAIN + "/v1/payment/approve" , body, PayApprovalRes.class);

    }
}
