package com.ssafy.api.response;

import com.ssafy.api.dto.DatePriceDto;
import com.ssafy.common.model.response.BaseResponseBody;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDatePostRes extends BaseResponseBody {
    List<DatePriceDto> datePrice;

    public static ProductDatePostRes of(Integer statusCode, String message, List<DatePriceDto> datePrice) {
        ProductDatePostRes res = new ProductDatePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setDatePrice(datePrice);
        return res;
    }

}
