package com.shutter.erp.quotation_service.dto.response;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ItemQuotationResponseDto {

    private Long id;

    private Long itemId;

    private String itemNameSnapshot;

    private String itemTypeSnapshot;

    private BigDecimal quantity;

    private BigDecimal referencePrice;

    private BigDecimal customerPrice;

    private BigDecimal amount;

    private BigDecimal profit;
}