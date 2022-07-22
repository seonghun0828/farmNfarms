
package com.ssafy.domain.trade;

import com.ssafy.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor
@Entity
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SELLER_ID")
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HAMMER_ID")
    private User hammer;


    @Column
    private String productId;

    @Column(nullable = false)
    private int productGrade;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private long hammerPrice;

    @Column(nullable = false)
    private boolean isDeposit;

    @Column(nullable = false)
    private boolean isReceived;

    @Builder
    public Trade(User seller,
                 User hammer,
                 String productId,
                 int productGrade,
                 int quantity,
                 long hammerPrice,
                 boolean isDeposit,
                 boolean isReceived) {

        this.seller = seller;
        this.hammer = hammer;
        this.productId = productId;
        this.productGrade = productGrade;
        this.quantity = quantity;
        this.hammerPrice = hammerPrice;
        this.isDeposit = isDeposit;
        this.isReceived = isReceived;
    }
}

