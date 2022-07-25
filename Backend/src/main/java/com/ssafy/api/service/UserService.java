package com.ssafy.api.service;

<<<<<<< Updated upstream
import com.ssafy.api.request.UserLoginPostReq;
=======
import com.ssafy.api.request.UserInfoChangePutReq;
>>>>>>> Stashed changes
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserInfoChangePutRes;
import com.ssafy.api.response.UserInfoGetRes;
import com.ssafy.domain.user.User;

public interface UserService {
    User createUser(UserRegisterPostReq userRegisterInfo);
    User getUserByPhone(String phone);

<<<<<<< Updated upstream
    boolean deleteUser(UserLoginPostReq deleteInfo);
=======
    UserInfoGetRes getUserInfo(String phone);

    boolean updateUserInfo(UserInfoChangePutReq userInfoChangePutReq, String phone);


>>>>>>> Stashed changes
}
