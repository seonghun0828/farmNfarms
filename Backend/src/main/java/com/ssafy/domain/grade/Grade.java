package com.ssafy.domain.grade;


import javax.persistence.*;

@Entity
public class Grade {

    @Id
    @GeneratedValue
    private Long id;

    private String productGrade;
}
