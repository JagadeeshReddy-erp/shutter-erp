package com.shutter.erp.inventory_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class StockResponseDto {

    private Long stockId;

    private Long itemId;

    private String itemName;

    private String itemType;

    private BigDecimal quantity;

    private BigDecimal purchasePrice;

    private LocalDateTime createdAt;

    private String createdBy;
}