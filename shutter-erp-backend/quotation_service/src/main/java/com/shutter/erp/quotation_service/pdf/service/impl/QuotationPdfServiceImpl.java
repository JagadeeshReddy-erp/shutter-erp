package com.shutter.erp.quotation_service.pdf.service.impl;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import com.shutter.erp.quotation_service.dto.response.QuotationResponseDto;
import com.shutter.erp.quotation_service.pdf.enums.QuotationPdfType;
import com.shutter.erp.quotation_service.pdf.service.QuotationPdfService;
import com.shutter.erp.quotation_service.service.QuotationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuotationPdfServiceImpl implements QuotationPdfService {

    private final QuotationService quotationService;
    private final TemplateEngine templateEngine;

    @Override
    public byte[] generateQuotationPdf(Long quotationId, QuotationPdfType type) {

        // 1. Fetch quotation (already includes shutters + items for detailed)
        QuotationResponseDto quotation =
                quotationService.getQuotationById(quotationId).getData();

        // 2. Thymeleaf context
        Context context = new Context();
        context.setVariable("quotation", quotation);
        context.setVariable("generatedDateTime",
                LocalDateTime.now());

        // 3. Select template
        String templateName;

        if (type == QuotationPdfType.DETAILED) {
            templateName = "pdf/quotation-detailed";
        } else {
            templateName = "pdf/quotation-simple";
        }

        // 4. Generate HTML
        String html = templateEngine.process(templateName, context);

        // 5. Convert HTML → PDF
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html, null);
            builder.toStream(outputStream);
            builder.run();

            return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }
}