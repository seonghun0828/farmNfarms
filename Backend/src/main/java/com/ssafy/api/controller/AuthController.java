package com.ssafy.api.controller;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.response.ReAccessPostRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.domain.authRefreshSave.AuthRefreshSave;
import com.ssafy.domain.authRefreshSave.AuthRefreshSaveRepository;
import com.ssafy.domain.user.User;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의
 */
@AllArgsConstructor
@Api(value = "인증 API", tags = {"Auth"})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    UserService userService;
    PasswordEncoder passwordEncoder;
    AuthRefreshSaveRepository authRefreshSaveRepository;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "아이디와 패스워드를 통해 로그인 한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo, HttpServletResponse response) {
        String phone = loginInfo.getPhone();
        String password = loginInfo.getPassword();

        User user = userService.getUserByPhone(phone);

        // 로그인 요청한 아이디가 DB에 존재하지 않으면 사용자없음 에러
        if(user==null) {
            return ResponseEntity.status(404).body(UserLoginPostRes.of(404, "Not Exist", null));
        }

        // 로그인 요청시 입력한 패스와드와 DB의 패스워드가 같은지 확인
        if(passwordEncoder.matches(password, user.getPassword())) {
            // 같으면 로그인 성공
            String refreshToken = JwtTokenUtil.getRefreshToken(phone);
            AuthRefreshSave tokenDto = new AuthRefreshSave();
            tokenDto.setRefreshToken(refreshToken);
            authRefreshSaveRepository.save(tokenDto);

            Cookie cookie=new Cookie("refreshToken", refreshToken); // refresh 담긴 쿠키 생성
            cookie.setMaxAge(JwtTokenUtil.refreshExpirationTime); // 쿠키의 유효시간을 refresh 유효시간만큼 설정
            cookie.setSecure(true); // 클라이언트가 HTTPS가 아닌 통신에서는 해당 쿠키를 전송하지 않도록 하는 설정
            cookie.setHttpOnly(true); // 브라우저에서 쿠키에 접근할 수 없도록 하는 설정
            cookie.setPath("/");
            
            response.addCookie(cookie);
            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getAccessToken(phone)));
        }

        // 패스워드가 일치하지 않으면 로그인 실패 응답
        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
    }

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "로그아웃한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 401, message = "토큰 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "요청 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<BaseResponseBody> logout(@CookieValue("refreshToken") String refreshToken, HttpServletResponse response) {
        // 쿠키 목록에 refreshToken 이 없으면 요청 실패 에러
        if(refreshToken==null) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Request Error"));
        }

        // DB에 refreshToken 이 없으면 토큰 없음 에러
        AuthRefreshSave token = authRefreshSaveRepository.findByRefreshToken(refreshToken);
        if(token!=null) {
            authRefreshSaveRepository.delete(token);
            return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
        }

        // 패스워드가 일치하지 않으면 로그인 실패 응답
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Token"));
    }

}
