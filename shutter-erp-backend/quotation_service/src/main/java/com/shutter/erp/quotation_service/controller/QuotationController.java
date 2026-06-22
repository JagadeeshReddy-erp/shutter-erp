package com.shutter.erp.quotation_service.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shutter.erp.quotation_service.common.ApiResponse;
import com.shutter.erp.quotation_service.common.PaginationResponse;
import com.shutter.erp.quotation_service.dto.request.CreateQuotationRequestDto;
import com.shutter.erp.quotation_service.dto.response.QuotationResponseDto;
import com.shutter.erp.quotation_service.service.QuotationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/quotation")
@RequiredArgsConstructor
public class QuotationController {

    private final QuotationService quotationService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public ResponseEntity<ApiResponse<QuotationResponseDto>> createQuotation(
            @Valid @RequestBody CreateQuotationRequestDto requestDto) {

        return ResponseEntity.ok(
                quotationService.createQuotation(requestDto));
    }

    @GetMapping("/{quotationId}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public ResponseEntity<ApiResponse<QuotationResponseDto>> getQuotationById(
            @PathVariable Long quotationId) {

        return ResponseEntity.ok(
                quotationService.getQuotationById(quotationId));
    }
    
    @GetMapping("/customer/{customerId}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public ResponseEntity<ApiResponse<PaginationResponse<QuotationResponseDto>>> getQuotationsByCustomerId(
            @PathVariable Long customerId,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {

        return ResponseEntity.ok(
                quotationService.getQuotationsByCustomerId(customerId, pageNo, pageSize));
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public ResponseEntity<ApiResponse<PaginationResponse<QuotationResponseDto>>> getAllQuotations(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {

        // Backend enforces sorting by ID DESC
        return ResponseEntity.ok(
                quotationService.getAllQuotations(pageNo, pageSize, fromDate, toDate));
    }

    @PutMapping("/{quotationId}")
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    public ResponseEntity<ApiResponse<QuotationResponseDto>> updateQuotation(
            @PathVariable Long quotationId,
            @Valid @RequestBody CreateQuotationRequestDto requestDto) {

        return ResponseEntity.ok(
                quotationService.updateQuotation(
                        quotationId,
                        requestDto));
    }

    @DeleteMapping("/{quotationId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteQuotation(
            @PathVariable Long quotationId) {

        return ResponseEntity.ok(
                quotationService.deleteQuotation(
                        quotationId));
    }
}