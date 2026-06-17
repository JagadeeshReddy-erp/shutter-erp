package com.shutter.erp.quotation_service.dto.response;

import java.math.BigDecimal;
import java.util.List;

import com.shutter.erp.quotation_service.enums.QuotationStatus;

import lombok.Data;

@Data
public class QuotationResponseDto {

    private Long id;

    private String quotationNo;

    private Integer versionNo;

    private Long customerId;

    private BigDecimal totalAmount;

    private BigDecimal totalProfit;

    private BigDecimal gstPercentage;

    private BigDecimal gstAmount;

    private BigDecimal grandTotal;

    private QuotationStatus status;

    private List<ShutterQuotationResponseDto> shutters;
}