package com.ssafy.api.service;

import com.ssafy.api.request.CreateAuctionRoomReq;
import com.ssafy.api.response.AuctionRoomsInfoRes;
import com.ssafy.domain.auctionDetail.AuctionDetailRepository;
import com.ssafy.api.dto.AuctionRoomDto;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import com.ssafy.domain.auctionRoom.AuctionRoomRepository;
import com.ssafy.domain.imgae.ImageRepository;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import io.openvidu.java.client.*;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionService {

    @Autowired
    private AuctionRoomRepository auctionRoomRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private AuctionDetailRepository auctionDetailRepository;
/*    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private ProductRepository productRepository;*/

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

    public ResponseEntity<JSONObject> getToken(String phoneNumber, CreateAuctionRoomReq sessionInfo){
        String sessionName = String.valueOf(sessionInfo.getTitle());
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


    // 방 제목 검색
    // 품목 검색
    // 통합 검색
    // 농부 이름 검색
    public Page<AuctionRoomsInfoRes> search(HashMap<String, String> params, Pageable pageable) {

        List<AuctionRoomDto> dtoList = new ArrayList<>();
        List<AuctionRoomsInfoRes> responseList = new ArrayList<>();

        if(params.get("key") == null || params.get("key").equals("")){
            List<AuctionRoom> foundList = auctionRoomRepository.findAllByAuctionedFalseOrderByCreatedAtDesc();

            for(AuctionRoom room : foundList) {

                Optional<User> foundUser = userRepository.findById(room.getOwnerId());

//            System.out.println(foundUser.get().toString());
                AuctionRoomsInfoRes auctionRoomsInfoRes = AuctionRoomsInfoRes.builder()
                        .id(room.getId())
                        .ownerName(foundUser.get().getName())
                        .ownerPhoneNumber(foundUser.get().getPhone())
                        .ownerPicture(foundUser.get().getPicture().getFullPath())
                        .auctionRoomThumbnail(room.getImage().getFullPath())
                        .auctionRoomTitle(room.getAuctionRoomTitle())
                        .auctionRoomDescription(room.getAuctionRoomDescription())
                        .build();

                responseList.add(auctionRoomsInfoRes);
            }
        }
        else{

            if(params.get("mode").equals("1")){
                dtoList = auctionRoomRepository.findAllByAuctionRoomTitle(params.get("key"));
            }else if(params.get("mode").equals("2")){

                dtoList = auctionDetailRepository.findAllByProduct(params.get("key"));
            }else if(params.get("mode").equals("3")){

                List<AuctionRoomDto> titleList = auctionRoomRepository.findAllByAuctionRoomTitle(params.get("key"));
                List<AuctionRoomDto> productList = auctionDetailRepository.findAllByProduct(params.get("key"));

                dtoList.addAll(titleList);
                dtoList.addAll(productList);
            }

            for(AuctionRoomDto dto : dtoList){
                User owner = userRepository.findById(dto.getOwnerId()).get();
                AuctionRoomsInfoRes res = AuctionRoomsInfoRes.builder()
                        .id(dto.getId())
                        .ownerName(owner.getName())
                        .ownerPhoneNumber(owner.getPhone())
                        .ownerPicture(owner.getPicture().getFullPath())
                        .auctionRoomThumbnail(imageRepository.findById(dto.getThumbnailId()).get().getFullPath())
                        .auctionRoomTitle(dto.getAuctionRoomTitle())
                        .auctionRoomDescription(dto.getAuctionRoomDescription()).build();

                responseList.add(res);
            }
        }

        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), responseList.size());
        return new PageImpl<>(responseList.subList(start, end), pageable, responseList.size());
    }
}
