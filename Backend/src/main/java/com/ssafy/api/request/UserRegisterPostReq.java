package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name="유저 PhoneNumber", example = "010-0000-0000")
    String phone;
    @ApiModelProperty(name="유저 Password", example = "your_password")
    String password;
    @ApiModelProperty(name="유저 이름", example = "홍길동")
    String name;
    @ApiModelProperty(name="유저 주소", example = "협의가 필요합니다")
    String address;
    @ApiModelProperty(name="유저 계좌번호", example = "110-342-143345")
    String account;
}
