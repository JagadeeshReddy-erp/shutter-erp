package com.shutter.erp.inventory_service.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockRequestDto {

    @NotNull(message = "Item ID is required")
    private Long itemId;

    @NotNull(message = "Quantity is required")
    @DecimalMin(
            value = "0.0",
            inclusive = false,
            message = "Quantity must be greater than zero")
    private BigDecimal quantity;

    @NotNull(message = "Purchase price is required")
    @DecimalMin(
            value = "0.0",
            inclusive = false,
            message = "Purchase price must be greater than zero")
    private BigDecimal purchasePrice;
}