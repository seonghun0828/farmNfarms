package com.ssafy.domain.user;

//import com.ssafy.domain.rating.Rating;
import com.ssafy.domain.rating.Rating;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "USER_ID" ,insertable = false, updatable = false)
    private long id;

    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private boolean phone_auth;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String account;
    @Column(nullable = false)
    private int grade;
    @Column(nullable = false)
    private String aboutMe;
    @Column(nullable = false)
    private LocalDateTime data_create;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Rating> ratings = new ArrayList<>();

}
