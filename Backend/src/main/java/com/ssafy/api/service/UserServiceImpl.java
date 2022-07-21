package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setPhone(userRegisterInfo.getPhone());
        user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User getUserByPhone(String phone) {
        User user = userRepository.findByPhone(phone);
        return null;
    }
}
