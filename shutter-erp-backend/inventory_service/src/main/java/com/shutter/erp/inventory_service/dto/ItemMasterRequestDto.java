package com.shutter.erp.inventory_service.dto;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.shutter.erp.inventory_service.entity.ItemName;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class ItemMasterRequestDto {

    @NotNull(message = "Item name is required")
    private ItemName itemName;

    @NotBlank(message = "Item type is required")
    private String itemType;
    
    @JsonProperty("isActive")
    @NotNull(message = "Is Active is required")
    private boolean isActive;
    
    @NotNull(message = "Selling price is required")
    @DecimalMin(value = "0.01", message = "Selling price must be greater than zero")
    private BigDecimal sellingPrice;
}