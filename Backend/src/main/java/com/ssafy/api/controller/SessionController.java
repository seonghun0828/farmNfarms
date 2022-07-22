package com.ssafy.api.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import com.ssafy.api.request.SessionGetTokenReq;
import com.ssafy.api.service.SessionService;
import org.json.simple.JSONObject;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/apis")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/get-token/{phoneNumber}")
    public ResponseEntity<JSONObject> getToken(
            @PathVariable String phoneNumber,
            @RequestBody SessionGetTokenReq sessionInfo){

        return sessionService.getToken(phoneNumber, sessionInfo);
    }

    }
