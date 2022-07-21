package com.ssafy.common.auth;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.ResponseBodyWriteUtil;
import com.ssafy.domain.user.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private UserService userService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        super(authenticationManager);
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterchain) throws IOException, ServletException {
        // JWT Token 헤더 인증정보
        String header = request.getHeader(JwtTokenUtil.HEADER_STRING);

        if(header == null || !header.startsWith(JwtTokenUtil.TOKEN_PRIFIX)) {
            filterchain.doFilter(request, response);
            return;
        }

        try {
            Authentication authentication = getAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ex) {
            ResponseBodyWriteUtil.sendError(request, response, ex);
            return;
        }

        filterchain.doFilter(request, response);
    }

    @Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request) throws Exception {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);

        // 요청 헤더의 Authorization 키 값에 jwt 토큰이 포함된 경우만, 토큰 검증 및 인증 처리 로직 실행
        if(token != null) {
            // JWTVerifier 클래스는 토큰의 JWT 형식뿐만 아니라 서명이 일치하는도 확인함
            JWTVerifier verifier = JwtTokenUtil.getVerifier();
            // 먼저 토큰을 확인하고 문제가 있으면 에러핸들링 처리
            JwtTokenUtil.handleError(token);
            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PRIFIX, ""));
            String phone = decodedJWT.getSubject();

            if (phone != null) {
                User user = userService.getUserByPhone(phone);
                if(user != null) {
                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성
                    FarmUserDetails userDetails = new FarmUserDetails(user);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(phone, null, userDetails.getAuthorities());
                    return jwtAuthentication;
                }
            }
            return null;
        }

        return null;
    }
}
