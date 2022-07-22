package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의
 */
@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody {
    @ApiModelProperty(name="JWT access 인증 토큰", example = "ekdif123SDKVIdf1231...")
    String accessToken;
    @ApiModelProperty(name="JWT refresh 인증 토큰", example = "ekdif123SDKVIdf1231...")
    String refreshToken;

    public static UserLoginPostRes of(Integer statusCode, String message, String accessToken, String refreshToken) {
        UserLoginPostRes res = new UserLoginPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setRefreshToken(refreshToken);
        return res;
    }
}
