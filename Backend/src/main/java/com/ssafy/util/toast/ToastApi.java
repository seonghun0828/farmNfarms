package com.ssafy.util.toast;

import com.ssafy.util.toast.dto.SmsSendRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
@Slf4j
public class ToastApi {

    @Value("${TOAST-APP-KEY}")
    private String APP_KEY;

    @Value("${TOAST-SECRET-KEY}")
    private String SECRET_KEY;

    private final RestTemplate rest;

    public void sendSms(SmsSendRequest request) {

        String url = "https://api-sms.cloud.toast.com/sms/v3.0/appKeys/" + APP_KEY + "/sender/sms";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-Secret-Key", SECRET_KEY);
        log.info("{}, {}", APP_KEY, SECRET_KEY);
        HttpEntity<SmsSendRequest> httpEntity = new HttpEntity<>(request, httpHeaders);
        rest.exchange(url, HttpMethod.POST, httpEntity, String.class);
    }

}
