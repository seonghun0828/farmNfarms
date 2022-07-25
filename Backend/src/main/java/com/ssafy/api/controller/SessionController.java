package com.ssafy.api.controller;


import com.ssafy.api.request.SessionReq;
import com.ssafy.api.service.SessionService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apis")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/create-room/{phoneNumber}")
    public ResponseEntity<JSONObject> getToken(
            @PathVariable String phoneNumber,
            @RequestBody SessionReq sessionInfo){

        return sessionService.createRoom(phoneNumber, sessionInfo);
    }

    }
