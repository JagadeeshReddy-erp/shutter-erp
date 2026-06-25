package com.shutter.erp.inventory_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.shutter.erp.inventory_service.entity.ItemName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemMasterResponseDto {

    private Long id;

    private ItemName itemName;

    private String itemType;

    private BigDecimal currentQuantity;

    private BigDecimal sellingPrice;
    
    private BigDecimal loadFactor;
    
    private boolean isActive;

    private LocalDateTime createdAt;

    private String createdBy;

    private LocalDateTime updatedAt;

    private String updatedBy;
}