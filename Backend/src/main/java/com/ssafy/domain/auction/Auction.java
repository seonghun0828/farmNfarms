
package com.ssafy.domain.auction;

import com.ssafy.domain.conference.Conference;
import com.ssafy.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "CONFERENCE_ID")
    private Conference conference;

    @Column
    private String productId;
    @Column(nullable = false)
    private int productGrade;
    @Column(nullable = false)
    private int quantity;
    @Column(nullable = false)
    private long startingPrice;
    @Column(nullable = false)
    private long bidIncrement;
    @Column(nullable = false)
    private long hammerPrice;
    @Column(nullable = false)
    private long hammerUserId;
    @Column(nullable = false)
    private boolean isActive;

}

