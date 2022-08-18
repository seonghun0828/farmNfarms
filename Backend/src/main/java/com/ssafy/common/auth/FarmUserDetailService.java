package com.ssafy.common.auth;

import com.ssafy.api.service.UserService;
import com.ssafy.domain.user.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class FarmUserDetailService implements UserDetailsService {

     UserService userService;

    @Override
    public UserDetails loadUserByUsername(String phone) throws UsernameNotFoundException {
        User user = userService.getUserByPhone(phone);
        if(user!=null) {
            FarmUserDetails userDetails = new FarmUserDetails(user);
            return userDetails;
        }
        return null;
    }
}
