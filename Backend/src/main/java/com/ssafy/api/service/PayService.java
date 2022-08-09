package com.ssafy.api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.api.response.PayApprovalRes;
import com.ssafy.api.response.PayReadyRes;
import com.ssafy.api.vo.PayApprovalVO;
import com.ssafy.domain.auctionResult.AuctionResult;
import org.json.simple.parser.JSONParser;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.*;

@Service
public class PayService {


    private static final String HOST ="https://kapi.kakao.com";
    private  static final String READY_ADDR = HOST + "/v1/payment/ready";
    private  static final String APPROVE_ADDR = HOST + "/v1/payment/approve";
    private static final String ADMIN = "7786e49abfcbd35314669d03d013869a";
    private static final String DOMAIN = "https://localhost:8080/api/v1/pay";
    //private static final String DOMAIN = "https://i7b203.p.ssafy.io:9000/api/v1/pay";


    public PayReadyRes payReady(AuctionResult auctionResult){

        JSONParser parser = new JSONParser();
        ObjectMapper mapper = new ObjectMapper();


        try{
            HttpURLConnection conn = (HttpURLConnection)new URL(READY_ADDR).openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization","KakaoAK 7786e49abfcbd35314669d03d013869a");
            conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
            conn.setDoOutput(true);

            String param = makePayQuery(auctionResult);

            OutputStream out = conn.getOutputStream();
            DataOutputStream dout = new DataOutputStream(out);
            dout.writeBytes(param);
            dout.close();

            int res = conn.getResponseCode();
            System.out.println("code : " + res);
            InputStream in;


            if(res == 200){
                in = conn.getInputStream();
            }else{
                in = conn.getErrorStream();
            }

            InputStreamReader inr = new InputStreamReader(in);
            BufferedReader br = new BufferedReader(inr);
            //System.out.println(br.readLine());
            PayReadyRes payReadyRes = mapper.readValue(br.readLine(), PayReadyRes.class);
            return payReadyRes;
        }
        catch (IOException e){
            e.printStackTrace();
        }
        return null;
    }

    private String makePayQuery(AuctionResult auctionResult) {
        return "cid=TC0ONETIME&" +
                "partner_order_id="+ String.valueOf(auctionResult.getId()) + "&" +
                "partner_user_id=" + String.valueOf(auctionResult.getBuyer().getId()) + "&" +
                "item_name=" + auctionResult.getAuctionDetail().getProductTitle() + "&" +
                "quantity=" + auctionResult.getAuctionDetail().getQuantity() + "&" +
                "total_amount=2200" + "&" +
                //"total_amount=" + auctionResult.getAuctionDetail().getQuantity() * auctionResult.getAuctionedPrice() + "&" +//총 가격 -> 결제창에 보여지는 값.
                "vat_amount=200&" + //세금?
                "tax_free_amount=0&" + //비과세 금액인듯
                "approval_url=" + DOMAIN + "/success&" +
                "cancel_url=" + DOMAIN+  "/cancel&" +
                "fail_url=" + DOMAIN + "/fail";
    }

    public ResponseEntity<PayApprovalRes> paySuccess(PayApprovalVO payApprovalVO, String pg_token) {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();

        headers.add("Authorization","KakaoAK " + ADMIN);
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type",MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
        System.out.println("VO: " + payApprovalVO.toString());
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("cid", payApprovalVO.getCid());
        params.add("tid", payApprovalVO.getTid());
        params.add("partner_order_id",payApprovalVO.getPartner_order_id());
        params.add("partner_user_id",payApprovalVO.getPartner_user_id());
        params.add("pg_token",pg_token);

        HttpEntity<MultiValueMap<String,String>> body
                = new HttpEntity<>(params, headers);
        return restTemplate.exchange(APPROVE_ADDR , HttpMethod.POST, body, PayApprovalRes.class);

    }
}
