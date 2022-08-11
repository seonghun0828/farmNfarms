package com.ssafy.api.controller;

import com.ssafy.api.response.ProductGetRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.ProductService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@Api(value = "농산물 정보 API", tags={"Product"})
@RestController
@RequestMapping("/api/v1/price")
public class ProductContoller {

    ProductService productService;

    @GetMapping("/main")
    @ApiOperation(value = "최근일자 가격 정보", notes = "농산물의 최근일자 가격 정보를 리턴합니다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<ProductGetRes> productMain() {

        return ResponseEntity.ok(ProductGetRes.of(200, "Success", productService.getMain()));
    }

}
