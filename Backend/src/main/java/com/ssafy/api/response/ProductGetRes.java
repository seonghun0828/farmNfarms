package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.domain.ProductPrice.Product;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductGetRes extends BaseResponseBody {

    List<Product> product;

    public static ProductGetRes of(Integer statusCode, String message, List<Product> products) {
        ProductGetRes res = new ProductGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setProduct(products);
        return res;
    }

}
