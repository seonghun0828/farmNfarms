
package com.ssafy.domain.trade;

import com.ssafy.domain.user.User;
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

}

