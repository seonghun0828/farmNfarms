package com.ssafy.domain.XXXgrade;


import javax.persistence.*;

@Entity
public class Grade {

    @Id
    @GeneratedValue
    private Long id;

    private String productGrade;
}
