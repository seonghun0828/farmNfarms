package com.ssafy.api.controller;


import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.simple.JSONObject;
import io.openvidu.java.client.*;
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

    private OpenVidu openVidu;
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

    private String OPENVIDU_URL;
    private String SECRET;


    public SessionController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    @PostMapping("/get-token/{phoneNumber}")
    public ResponseEntity<JSONObject> getToken(
            @PathVariable String phoneNumber,
            @RequestBody String sessionId){

        String sessionName = sessionId;
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC).data(phoneNumber).role(OpenViduRole.PUBLISHER).build();
        JSONObject responseJson = new JSONObject();

        if (this.mapSessions.get(sessionName) != null) {

            try {
                String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
                this.mapSessionNamesTokens.get(sessionName).put(token, OpenViduRole.PUBLISHER);
                responseJson.put(0, token);
                return new ResponseEntity<>(responseJson, HttpStatus.OK);

            } catch (OpenViduJavaClientException e1) {
                return getErrorResponse(e1);
            } catch (OpenViduHttpException e2) {
                if (404 == e2.getStatus()) {
                    this.mapSessions.remove(sessionName);
                    this.mapSessionNamesTokens.remove(sessionName);
                }
            }
        }

        try {

            Session session = this.openVidu.createSession();
            String token = session.createConnection(connectionProperties).getToken();

            this.mapSessions.put(sessionName, session);
            this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
            this.mapSessionNamesTokens.get(sessionName).put(token, OpenViduRole.PUBLISHER);

            responseJson.put(0, token);

            return new ResponseEntity<>(responseJson, HttpStatus.OK);

        } catch (Exception e) {
            return getErrorResponse(e);
        }
    }
    private ResponseEntity<JSONObject> getErrorResponse(Exception e) {
        JSONObject json = new JSONObject();
        json.put("cause", e.getCause());
        json.put("error", e.getMessage());
        json.put("exception", e.getClass());
        return new ResponseEntity<>(json, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    }
