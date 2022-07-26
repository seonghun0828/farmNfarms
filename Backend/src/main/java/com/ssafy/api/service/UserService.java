package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.domain.user.User;

public interface UserService {
    User createUser(UserRegisterPostReq userRegisterInfo);
    User getUserByPhone(String phone);

    boolean deleteUser(UserLoginPostReq deleteInfo);

    boolean isDuplicated();
}
