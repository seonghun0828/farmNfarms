package com.ssafy.domain.user;

//import com.ssafy.domain.rating.Rating;
import com.ssafy.domain.auctionRoom.AuctionRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private String password;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String account;
    @Column(nullable = false)
    private String about_me;
    @Column(nullable = false)
    private LocalDateTime data_create;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AUCTION_ROOM_ID")
    private AuctionRoom auctionRoom;

    @Column
    private String bank;

    @Column
    private String zoneCode;

    @Column
    private String detailAddress;


    @Builder
    public User(String phone,
                String password,
                String name,
                String address,
                String account,
                String about_me,
                LocalDateTime data_create,
                AuctionRoom auctionRoom,
                String bank,
                String zoneCode,
                String detailAddress) {

        this.phone = phone;
        this.password = password;
        this.name = name;
        this.address = address;
        this.account = account;
        this.about_me = about_me;
        this.data_create = data_create;
        this.auctionRoom = auctionRoom;
        this.bank = bank;
        this.zoneCode = zoneCode;
        this.detailAddress = detailAddress;
    }
}
