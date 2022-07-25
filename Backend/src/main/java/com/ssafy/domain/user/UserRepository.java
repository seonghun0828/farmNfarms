package com.ssafy.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByPhone(String phone);
<<<<<<< Updated upstream
    void deleteByPhone(String phone);
=======

>>>>>>> Stashed changes
}
