package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import lombok.AllArgsConstructor;
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

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        if (userRepository.findByPhone(userRegisterInfo.getPhone()) == null) {

        }

        User user = new User();
        user.setPhone(userRegisterInfo.getPhone());
        user.setPhone_auth(false);
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        user.setName(userRegisterInfo.getName());
        user.setAddress(userRegisterInfo.getAddress());
        user.setAccount(userRegisterInfo.getAccount());
        user.setAbout_me("자기소개를 입력해주세요");
        user.setGrade(0);
        user.setData_create(LocalDateTime.now());
        return userRepository.save(user);
    }

    @Override
    public User getUserByPhone(String phone) {
        User user = userRepository.findByPhone(phone);
        return user;
    }

    @Override
    public boolean deleteUser(UserLoginPostReq deleteInfo) {
        if(passwordEncoder.matches(deleteInfo.getPassword(), userRepository.findByPhone(deleteInfo.getPhone()).getPassword())){
            userRepository.deleteByPhone(deleteInfo.getPhone());
            return true;
        }
        return false;
    }
}
