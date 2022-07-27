package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserInfoChangePutReq;
import com.ssafy.api.request.UserInfoChangePutReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserInfoChangePutRes;
import com.ssafy.api.response.UserInfoGetRes;
import com.ssafy.domain.user.User;

public interface UserService {
    boolean createUser(UserRegisterPostReq userRegisterInfo);
    User getUserByPhone(String phone);

    boolean deleteUser(UserLoginPostReq deleteInfo);
    UserInfoGetRes getUserInfo(String phone);

    boolean updateUserInfo(UserInfoChangePutReq userInfoChangePutReq, String phone);


}
