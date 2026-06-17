package com.shutter.erp.quotation_service.dto.request;
import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class ShutterQuotationRequestDto {

    @NotNull(message = "Shutter number is required")
    private Integer shutterNo;

    @NotNull(message = "Width is required")
    private BigDecimal width;

    @NotNull(message = "Height is required")
    private BigDecimal height;

    @Valid
    @NotEmpty(message = "Items cannot be empty")
    private List<ItemQuotationRequestDto> items;
}