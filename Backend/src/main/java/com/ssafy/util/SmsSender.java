package com.ssafy.util;

import com.ssafy.util.toast.ToastApi;
import com.ssafy.util.toast.dto.Recipient;
import com.ssafy.util.toast.dto.SmsSendRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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

            toastApi.sendSms(request);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
