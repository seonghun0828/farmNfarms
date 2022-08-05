package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PayReadyRes {

    String tid;
    String next_redirect_app_url;
    String next_redirect_mobile_url;
    String next_redirect_pc_url;
    String android_app_scheme;
    String ios_app_scheme;
    String created_at;
    boolean tms_result;

}
