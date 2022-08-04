package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PayReadyRes {

    String tid;
    String next_redirect_mobile_url;
    LocalDateTime created_at;

}
