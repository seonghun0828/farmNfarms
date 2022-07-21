package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name="유저 PhoneNumber", example = "010-0000-0000")
    String phone;
    @ApiModelProperty(name="유저 Password", example = "your_password")
    String password;
}
