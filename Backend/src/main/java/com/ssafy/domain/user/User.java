package com.ssafy.domain.user;

//import com.ssafy.domain.rating.Rating;
import com.ssafy.domain.rating.Rating;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
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
    private String about_me;
    @Column(nullable = false)
    private LocalDateTime data_create;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    List<Rating> ratings = new ArrayList<>();

    @Builder
    public User(String phone,
                boolean phone_auth,
                String password,
                String name,
                String address,
                String account,
                int grade,
                String about_me) {

        this.phone = phone;
        this.phone_auth = phone_auth;
        this.password = password;
        this.name = name;
        this.address = address;
        this.account = account;
        this.grade = grade;
        this.about_me = about_me;
    }

    public User update(boolean phoneAuth){
        this.phone_auth = phoneAuth;
        return this;
    }

}
