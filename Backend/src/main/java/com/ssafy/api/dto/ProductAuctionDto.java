package com.ssafy.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductAuctionDto {

    long productId;
    long gradeId;

    boolean isAuctioned;
    int initPrice;
    int bidIncrement;
    int auctionedPrice;
    int quantity;

}
