package com.ssafy.api.service;

import com.ssafy.api.request.SessionGetTokenReq;
import io.openvidu.java.client.*;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionService {


    private OpenVidu openVidu;
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

    private String OPENVIDU_URL;
    private String SECRET;


    public SessionService(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    public ResponseEntity<JSONObject> getToken(String phoneNumber, SessionGetTokenReq sessionInfo){
        String sessionName = String.valueOf(sessionInfo.getSessionId());
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
