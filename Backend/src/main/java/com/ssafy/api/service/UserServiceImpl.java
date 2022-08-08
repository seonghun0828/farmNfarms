package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserInfoChangePutReq;
import com.ssafy.api.request.UserInfoChangePutReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserInfoChangePutRes;
import com.ssafy.api.response.UserInfoGetRes;
import com.ssafy.domain.imgae.ImageRepository;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public boolean createUser(UserRegisterPostReq userRegisterInfo) {
        if (userRepository.findByPhone(userRegisterInfo.getPhone()) != null) {
            return false;
        }

        User user = new User();
        user.setPhone(userRegisterInfo.getPhone());
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setName(userRegisterInfo.getName());
        user.setAddress(userRegisterInfo.getAddress());
        user.setBank(userRegisterInfo.getBank());
        user.setAccount(userRegisterInfo.getAccount());
        user.setAbout_me(userRegisterInfo.getAboutMe());
        user.setZipCode(userRegisterInfo.getZipCode());
        user.setDetailAddress(userRegisterInfo.getDetailAddress());
        user.setPicture(imageRepository.findById(userRegisterInfo.getPicture()).get());
        user.setData_create(LocalDateTime.now());
        userRepository.save(user);
        return true;
    }

    @Override
    public User getUserByPhone(String phone) {
        User user = userRepository.findByPhone(phone);
        return user;
    }

    @Override
    public boolean deleteUser(UserLoginPostReq deleteInfo) {
        if (passwordEncoder.matches(deleteInfo.getPassword(), userRepository.findByPhone(deleteInfo.getPhone()).getPassword())) {
            userRepository.deleteByPhone(deleteInfo.getPhone());
            return true;
        }
        return false;
    }


    @Override
    public UserInfoGetRes getUserInfo(String phone) {

        User user = userRepository.findByPhone(phone);

        return new UserInfoGetRes(user.getPhone(), user.getAccount(), user.getAddress(), user.getName(), user.getAbout_me(),
                                    user.getBank(), user.getZipCode(), user.getDetailAddress(), user.getPicture().getFullPath());

//        return UserInfoGetRes.builder()
//                .phone(user.getPhone())
//                .account(user.getAccount())
//                .address(user.getAddress())
//                .build();
    }

    //
    @Override
    public boolean updateUserInfo(UserInfoChangePutReq request, String phone) {
        try {
            User user = userRepository.findByPhone(phone);
            if (request.getPassword() != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                if (request.getNewPassword() != null && request.getNewPasswordAgain() != null) {
                    user.setPassword(passwordEncoder.encode(request.getNewPassword()));

                } else {
                    user.setPassword(user.getPassword());
                }
                user.setAccount(request.getAccount());
                user.setAddress(request.getAddress());
                user.setName(request.getName());    //상의 필요
                user.setAbout_me(request.getAboutMe());
                user.setBank(request.getBank());
                user.setDetailAddress(request.getDetailAddress());
                user.setZipCode(request.getZipCode());
                user.setPicture(imageRepository.findById(request.getPicture()).get());

                userRepository.save(user);

//                System.out.println(request.getNewPassword());
//                System.out.println(request.getNewPasswordAgain());
//                System.out.println(request.getNewPasswordAgain() == request.getNewPassword());
//                System.out.println(passwordEncoder.matches(request.getNewPasswordAgain(), request.getNewPassword()));
                return true;

            } else throw new IllegalArgumentException();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
