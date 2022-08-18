package com.ssafy.domain.auctionResult;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.domain.BaseTimeEntity;
import com.ssafy.domain.auctionDetail.AuctionDetail;
import com.ssafy.domain.user.User;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuctionResult extends BaseTimeEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name ="AUCTION_DETAIL_ID")
    private AuctionDetail auctionDetail;

    @ManyToOne
    @JoinColumn(name = "SELLER_ID")
    @JsonIgnore
    private User seller;

    @ManyToOne
    @JoinColumn(name = "BUYER_ID")
    @JsonIgnore
    private  User buyer;


    @Column
    private Long auctionedPrice;

    @Column
    private boolean dealCompleted;

    @Column
    private boolean deliveryCompleted;

    @Column
    private boolean paymentCompleted;

}
