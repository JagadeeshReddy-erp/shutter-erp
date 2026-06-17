package com.shutter.erp.quotation_service.dto.request;
import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.Data;
@Data
public class CreateQuotationRequestDto {

    @NotNull(message = "Customer Id is required")
    private Long customerId;

    @NotNull(message = "GST percentage is required")
    private BigDecimal gstPercentage;

    @Valid
    @NotEmpty(message = "At least one shutter is required")
    private List<ShutterQuotationRequestDto> shutters;
}
