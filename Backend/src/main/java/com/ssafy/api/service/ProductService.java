package com.ssafy.api.service;

import com.ssafy.domain.ProductPrice.Product;
import com.ssafy.domain.ProductPrice.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    /**
     * 날짜별로 데이터를 넣고
     * 해당 날짜의 데이터가 없으면
     * OPENAPI 에서 받아와서 저장하고
     * 저장한 데이터를 불러와서 보내주기
     */
    public List<Product> getMain() {
        productRepository.save(Product.builder()
                        .date("2022-11-11")
                        .direction("1")
                        .name("사과")
                        .unit("20KG")
                        .value("0.3")
                        .price0("50,023")
                        .price1("49,891")
                        .price30("50,745")
                        .price365("61,431")
                        .build());
        List<Product> products = productRepository.findAll();
        return products;
    }

}
