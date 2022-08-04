package com.ssafy.api.response;

import com.ssafy.api.vo.AmountVO;
import com.ssafy.api.vo.CardVO;

import java.time.LocalDateTime;

public class PayApprovalRes {

    private String aid, tid, cid, sid;
    private String partner_order_id, partner_user_id, payment_method_type;
    private AmountVO amount;
    private CardVO card_info;
    private String item_name, item_code, payload;
    private Integer quantity, tax_free_amount, vat_amount;
    private LocalDateTime created_at, approved_at;

}
