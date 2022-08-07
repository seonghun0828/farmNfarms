package com.ssafy.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class UserInfoGetRes {

    private String phone;
    private String account;
    private String address;
    private String name;
    private String aboutMe;
    private String bank;
    private String zipCode;
    private String detailAddress;
    private String picture;
}
