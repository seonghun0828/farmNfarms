package com.ssafy.domain.product;

import com.ssafy.domain.grade.Grade;

import javax.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private int id;

    @Column
    private String productTitle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GRADE_ID")
    private Grade grade;

    public Product(String productTitle, Grade grade) {
        this.productTitle = productTitle;
        this.grade = grade;
    }
}
