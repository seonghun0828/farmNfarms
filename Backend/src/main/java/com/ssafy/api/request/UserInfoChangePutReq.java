package com.ssafy.api.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
public class UserInfoChangePutReq {

    @NotBlank(message = "비밀번호 인증 후, 정보 수정이 가능합니다.")
    private String password;

    private String newPassword;

    private String newPasswordAgain;

    private String account;

    private String address;

//    --- 추가 됨 ---

    private String name;

    private String bank;

    private String zipCode;

    private String detailAddress;

    private Long picture;
}
