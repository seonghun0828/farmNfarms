package com.ssafy.api.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class DatePriceReq {
    private String date;
    private String product;
}
