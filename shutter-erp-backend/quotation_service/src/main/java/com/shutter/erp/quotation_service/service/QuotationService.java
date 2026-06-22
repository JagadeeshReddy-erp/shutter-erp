package com.shutter.erp.quotation_service.service;

import java.time.LocalDate;

import com.shutter.erp.quotation_service.common.ApiResponse;
import com.shutter.erp.quotation_service.common.PaginationResponse;
import com.shutter.erp.quotation_service.dto.request.CreateQuotationRequestDto;
import com.shutter.erp.quotation_service.dto.response.QuotationResponseDto;

public interface QuotationService {

    ApiResponse<QuotationResponseDto> createQuotation(
            CreateQuotationRequestDto requestDto);

    ApiResponse<QuotationResponseDto> getQuotationById(
            Long quotationId);

    ApiResponse<QuotationResponseDto> updateQuotation(
            Long quotationId,
            CreateQuotationRequestDto requestDto);

    ApiResponse<String> deleteQuotation(
            Long quotationId);

	ApiResponse<PaginationResponse<QuotationResponseDto>> getAllQuotations(int pageNo, int pageSize, LocalDate fromDate,LocalDate toDate);
	
	ApiResponse<PaginationResponse<QuotationResponseDto>> getQuotationsByCustomerId(
	        Long customerId,
	        int pageNo,
	        int pageSize);
}