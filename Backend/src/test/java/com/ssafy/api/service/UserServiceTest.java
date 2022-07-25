package com.ssafy.api.service;

import com.ssafy.api.request.UserInfoChangePutReq;
import com.ssafy.api.response.UserInfoGetRes;
import com.ssafy.domain.user.User;
import com.ssafy.domain.user.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    private static final String ANY_PHONE = "1234";
    private static final String ANY_ADDRESS = "some_address";
    private static final String ANY_ACCOUNT = "some_account";

    @InjectMocks
    UserServiceImpl sut;

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    User user;

    @Test
    public void 휴대폰_번호를_넘기면_정보가_반환된다() {
        given(user.getPhone()).willReturn(ANY_PHONE);
        given(user.getAddress()).willReturn(ANY_ADDRESS);
        given(user.getAccount()).willReturn(ANY_ACCOUNT);
        given(userRepository.findByPhone(ANY_PHONE)).willReturn(user);

        UserInfoGetRes actual = sut.getUserInfo(ANY_PHONE);

        Assertions.assertThat(actual.getPhone()).isEqualTo(ANY_PHONE);
        Assertions.assertThat(actual.getAddress()).isEqualTo(ANY_ADDRESS);
        Assertions.assertThat(actual.getAccount()).isEqualTo(ANY_ACCOUNT);
    }

    @Test
    public void 새로운_유저정보를_넘기면_호출한다() {
        // given
        given(userRepository.findByPhone(ANY_PHONE)).willReturn(user);

        UserInfoChangePutReq data = new UserInfoChangePutReq(ANY_ACCOUNT, ANY_ADDRESS);
        // when
        sut.updateUserInfo(data, ANY_PHONE);

        // then
        verify(userRepository).findByPhone(ANY_PHONE);
        verify(user).setAddress(ANY_ADDRESS);
        verify(user).setAccount(ANY_ACCOUNT);
        verify(userRepository).save(user);
    }

    @Test
    public void 새로운_유저정보를_넘기면_결과를_반환한다() {
        // given
        given(userRepository.findByPhone(ANY_PHONE)).willReturn(user);
        UserInfoChangePutReq data = new UserInfoChangePutReq(ANY_ACCOUNT, ANY_ADDRESS);

        // when
        boolean actual = sut.updateUserInfo(data, ANY_PHONE);

        // then
        Assertions.assertThat(actual).isTrue();
    }

    @Test
    public void 비어있는_dto_를_넘기면_실패한다() {
        // given
//        given(userRepository.findByPhone(ANY_PHONE)).willReturn(user);
        UserInfoChangePutReq data = new UserInfoChangePutReq(null, null);

        // when
        boolean actual = sut.updateUserInfo(data, ANY_PHONE);

        // then
        Assertions.assertThat(actual).isFalse();
    }

    @Test
    public void 유저를_저장하다가_예외가_발생하면_false_를_반환한다() {
        // given
        given(userRepository.findByPhone(ANY_PHONE)).willReturn(user);
        given(userRepository.save(user)).willThrow(RuntimeException.class);

        UserInfoChangePutReq data = new UserInfoChangePutReq(ANY_ACCOUNT, ANY_ADDRESS);

        // when
        boolean actual = sut.updateUserInfo(data, ANY_PHONE);

        // then
        Assertions.assertThat(actual).isFalse();
    }
}