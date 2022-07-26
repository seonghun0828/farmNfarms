
package com.ssafy.domain.auction;

import com.ssafy.domain.conference.Conference;
import com.ssafy.domain.user.User;
import lombok.Builder;
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

    @ManyToOne(fetch = FetchType.LAZY)
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

    @Builder
    public Auction(Conference conference,
                   String productId,
                   int productGrade,
                   int quantity,
                   long startingPrice,
                   long bidIncrement,
                   long hammerPrice,
                   long hammerUserId,
                   boolean isActive) {

        this.conference = conference;
        this.productId = productId;
        this.productGrade = productGrade;
        this.quantity = quantity;
        this.startingPrice = startingPrice;
        this.bidIncrement = bidIncrement;
        this.hammerPrice = hammerPrice;
        this.hammerUserId = hammerUserId;
        this.isActive = isActive;
    }
}

