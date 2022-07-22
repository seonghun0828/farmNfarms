package com.ssafy.util.toast;

import com.ssafy.util.toast.dto.SmsSendRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Component
public class ToastApi {

    private static final String APP_KEY = "4jBypoucCNvwwJt6";
    private static final String URL = "https://api-sms.cloud.toast.com/sms/v3.0/appKeys/" + APP_KEY + "/sender/sms";
    private static final String SECRET_KEY = "geGCPLFI";
    private final RestTemplate rest;

    public void sendSms(SmsSendRequest request) {

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-Secret-Key", SECRET_KEY);

        HttpEntity<SmsSendRequest> httpEntity = new HttpEntity<>(request, httpHeaders);
        ResponseEntity<String> response = rest.exchange(URL, HttpMethod.POST, httpEntity, String.class);

    }

}
