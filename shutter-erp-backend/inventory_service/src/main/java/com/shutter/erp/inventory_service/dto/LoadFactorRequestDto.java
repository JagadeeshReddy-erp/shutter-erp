package com.shutter.erp.inventory_service.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoadFactorRequestDto {

    @NotNull(message = "Item id is required")
    private Long itemId;

    @NotNull(message = "Load factor is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal loadFactor;

    private String description;

}