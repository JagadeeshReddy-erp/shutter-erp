package com.shutter.erp.quotation_service.pdf.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.shutter.erp.quotation_service.pdf.enums.QuotationPdfType;
import com.shutter.erp.quotation_service.pdf.service.QuotationPdfService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/quotation")
@RequiredArgsConstructor
public class QuotationPdfController {

    private final QuotationPdfService quotationPdfService;

    @GetMapping("/pdf/{quotationId}")
    public ResponseEntity<byte[]> downloadPdf(
            @PathVariable Long quotationId,
            @RequestParam(defaultValue = "SIMPLE") QuotationPdfType type) {

        byte[] pdf = quotationPdfService.generateQuotationPdf(quotationId, type);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header("Content-Disposition",
                        "attachment; filename=quotation-" + quotationId + ".pdf")
                .body(pdf);
    }
}