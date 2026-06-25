package com.shutter.erp.inventory_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoadFactorResponseDto {

    private Long id;
    private Long itemId;
    private String itemName;   // optional join later
    private String itemType;   // optional join later
    private BigDecimal loadFactor;
    private String description;

    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String updatedBy;
}
