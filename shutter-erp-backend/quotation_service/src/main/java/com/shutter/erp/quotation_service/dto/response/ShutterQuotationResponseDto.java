package com.shutter.erp.quotation_service.dto.response;

import java.math.BigDecimal;
import java.util.List;

import com.shutter.erp.quotation_service.enums.ShutterStatus;

import lombok.Data;

@Data
public class ShutterQuotationResponseDto {

    private Long id;

    private Integer shutterNo;

    private BigDecimal width;

    private BigDecimal height;

    private BigDecimal shutterTotalAmount;

    private BigDecimal shutterTotalProfit;

    private ShutterStatus  status;

    private List<ItemQuotationResponseDto> items;
}