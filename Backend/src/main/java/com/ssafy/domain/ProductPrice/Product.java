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
    private String price;

    @Builder
    public Product(String name, String unit, String direction, String value, String date, String price) {
        this.name = name;
        this.unit = unit;
        this.direction = direction;
        this.value = value;
        this.date = date;
        this.price = price;
    }
}
