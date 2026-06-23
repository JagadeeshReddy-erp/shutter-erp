package com.shutter.erp.quotation_service.pdf.service;

import com.shutter.erp.quotation_service.pdf.enums.QuotationPdfType;

public interface QuotationPdfService {

    byte[] generateQuotationPdf(Long quotationId, QuotationPdfType type);
}