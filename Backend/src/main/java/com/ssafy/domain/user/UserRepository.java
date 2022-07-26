package com.ssafy.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByPhone(String phone);

    // void deleteByPhone(String phone);
}
