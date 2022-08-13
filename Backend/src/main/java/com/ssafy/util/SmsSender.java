package com.ssafy.util;

import com.ssafy.domain.auctionResult.AuctionResult;
import com.ssafy.domain.auctionResult.AuctionResultRepository;
import com.ssafy.util.toast.ToastApi;
import com.ssafy.util.toast.dto.Recipient;
import com.ssafy.util.toast.dto.SmsSendRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Component
@RequiredArgsConstructor
public class SmsSender {
    private final ToastApi toastApi;


    public void sendVerificationMessage(String phoneNumber, String confirmNumber) {
        try {

            List<Recipient> list = new ArrayList<>();
            Recipient recipient = new Recipient(phoneNumber);
            list.add(recipient);

            SmsSendRequest request = new SmsSendRequest();
            request.setSendNo("01050279681");
            request.setBody(confirmNumber);
            request.setRecipientList(list);

            String messageType = "sms";

            toastApi.sendSms(request, messageType);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //경매 완료 후 바로 보내는 문자
    public void sendPaymentMessage(AuctionResult auctionResult) {
        try {
            Long id = auctionResult.getId();
            String sellerName = auctionResult.getSeller().getName();
            String productTitle = auctionResult.getAuctionDetail().getProductTitle();
            String grade = auctionResult.getAuctionDetail().getGrade();
            int quantity = auctionResult.getAuctionDetail().getQuantity();
            Long auctionedPrice = auctionResult.getAuctionedPrice();
            LocalDateTime expire = auctionResult.getCreatedAt().plusDays(1);


            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy년 MM월 dd일 a hh시 mm분", Locale.KOREA);

            Date date = java.sql.Timestamp.valueOf(expire);

            String expireStr = simpleDateFormat.format(date);

            StringBuilder sb = new StringBuilder();
            sb.append("팜앤팜스를 이용해주셔서 감사합니다! \n")
              .append(expireStr+ "안으로 결제해주시기 바랍니다. \n")
              .append("주문 번호: " + id + "\n")
              .append("판매자: " + sellerName + "\n")
              .append("품목: " + productTitle + "\n")
              .append("등급: " + grade + "\n")
              .append("수량: " + quantity + "\n")
              .append("금액: " + auctionedPrice + "\n")
              .append("결제를 포함한 자세한 정보는 팜앤팜스 홈페이지에서 확인하실 수 있습니다.");

            String body = sb.toString();
            List<Recipient> recipients = new ArrayList<>();
            Recipient recipient = new Recipient(auctionResult.getBuyer().getPhone());
            recipients.add(recipient);

            SmsSendRequest request = new SmsSendRequest();
            request.setSendNo("01050279681");
            request.setRecipientList(recipients);
            request.setBody(body);
            request.setTitle("팜앤팜스");

            String messageType = "mms";

            toastApi.sendSms(request, messageType);

            System.out.println(request);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //결제기한 1시간 전 보내는 문자
    public void sendRemindMessage(String buyerPhoneNumber) {

    }

}
