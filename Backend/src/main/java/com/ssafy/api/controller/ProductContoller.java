package com.ssafy.api.controller;

import com.ssafy.api.dto.DatePriceDto;
import com.ssafy.api.request.DatePriceReq;
import com.ssafy.api.response.ProductDatePostRes;
import com.ssafy.api.response.ProductGetRes;
import com.ssafy.api.service.ProductService;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@Api(value = "농산물 정보 API", tags={"Product"})
@RestController
@RequestMapping("/api/v1/price")
public class ProductContoller {

    ProductService productService;

    @GetMapping("/main")
    @ApiOperation(value = "최근일자 가격 정보", notes = "농산물의 최근일자 가격 정보를 리턴합니다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ProductGetRes> productMain() {
        return ResponseEntity.ok(ProductGetRes.of(200, "Success", productService.getMain()));
    }

    @PostMapping("/date")
    @ApiOperation(value = "일별 품목별 가격 정보", notes = "농산물 품목의 일별 가격 정보를 리턴합니다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ProductDatePostRes> productDatePrice(@RequestBody @ApiParam(value="날짜와 품목정보", required = true) DatePriceReq priceInfo) {
        List<DatePriceDto> datePrice = productService.getDatePrice(priceInfo);
        if(datePrice.size()==0) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(ProductDatePostRes.of(200, "Success", datePrice));
    }

}
