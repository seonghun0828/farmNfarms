package com.ssafy.api.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class PayApprovalVO {

    private String cid;
    private String cid_secret;
    private String tid;
    private String partner_order_id;
    private String partner_user_id;
    private String pg_token;
    private String payload;
    private int total_amount;

    public PayApprovalVO(String cid, String tid, String partner_order_id, String partner_user_id) {
        this.cid = cid;
        this.tid = tid;
        this.partner_order_id = partner_order_id;
        this.partner_user_id = partner_user_id;
    }
}
