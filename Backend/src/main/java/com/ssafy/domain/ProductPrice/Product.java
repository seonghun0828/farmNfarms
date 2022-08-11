package com.ssafy.domain.ProductPrice;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Product {

    @Id @GeneratedValue
    private Long id;

    private String name;
    private String unit;
    private String direction;
    private String value;
    private String date;
    private String price0;
    private String price1;
    private String price30;
    private String price365;

    @Builder
    public Product(String name, String unit, String direction, String value, String date, String price0, String price1, String price30, String price365) {
        this.name = name;
        this.unit = unit;
        this.direction = direction;
        this.value = value;
        this.date = date;
        this.price0 = price0;
        this.price1 = price1;
        this.price30 = price30;
        this.price365 = price365;
    }
}
