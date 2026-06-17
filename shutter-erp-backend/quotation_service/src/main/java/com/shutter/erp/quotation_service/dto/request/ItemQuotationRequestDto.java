package com.shutter.erp.quotation_service.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class ItemQuotationRequestDto {

    @NotNull(message = "Item Id is required")
    private Long itemId;

    @NotBlank(message = "Item Name is required")
    private String itemNameSnapshot;

    @NotBlank(message = "Item Type is required")
    private String itemTypeSnapshot;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.01")
    private BigDecimal quantity;

    @NotNull(message = "Reference Price is required")
    @DecimalMin(value = "0.01")
    private BigDecimal referencePrice;

    @NotNull(message = "Customer Price is required")
    @DecimalMin(value = "0.01")
    private BigDecimal customerPrice;
}