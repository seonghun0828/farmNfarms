package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserInfoChangePutReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserInfoGetRes;
import com.ssafy.domain.imgae.ImageRepository;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service("userService")
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageRepository imageRepository;

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
        user.setZipCode(userRegisterInfo.getZipCode());
        user.setDetailAddress(userRegisterInfo.getDetailAddress());
        user.setPicture(imageRepository.findById(userRegisterInfo.getPicture()).get());
        user.setData_create(LocalDateTime.now());
        userRepository.save(user);
        return true;
    }

    public User getUserByPhone(String phone) {
        User user = userRepository.findByPhone(phone);
        return user;
    }

    public boolean deleteUser(UserLoginPostReq deleteInfo) {
        if (passwordEncoder.matches(deleteInfo.getPassword(), userRepository.findByPhone(deleteInfo.getPhone()).getPassword())) {
            userRepository.deleteByPhone(deleteInfo.getPhone());
            return true;
        }
        return false;
    }


    public UserInfoGetRes getUserInfo(String phone) {

        User user = userRepository.findByPhone(phone);
        System.out.println(user.getPicture());

        return UserInfoGetRes.builder()
                .phone(user.getPhone())
                .account(user.getAccount())
                .address(user.getAddress())
                .name(user.getName())
                .bank(user.getBank())
                .zipCode(user.getZipCode())
                .detailAddress(user.getDetailAddress())
                .picturePath(user.getPicture().getFullPath())
                .pictureIdx(user.getPicture().getId())
                .build();
    }

    //
    public boolean updateUserInfo(UserInfoChangePutReq request, String phone) {
        try {
            User user = userRepository.findByPhone(phone);
            if (request.getPassword() != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                if (request.getNewPassword() != null && request.getNewPasswordAgain() != null) {
                    if(request.getNewPassword().equals(request.getNewPasswordAgain())) {
                        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                    }else {
                        return false;
                    }
                } else {
                    user.setPassword(user.getPassword());
                }
                user.setAccount(request.getAccount());
                user.setAddress(request.getAddress());
                user.setName(request.getName());
                user.setBank(request.getBank());
                user.setDetailAddress(request.getDetailAddress());
                user.setZipCode(request.getZipCode());
                user.setPicture(imageRepository.findById(request.getPicture()).get());

                userRepository.save(user);

                return true;

            } else throw new IllegalArgumentException();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
