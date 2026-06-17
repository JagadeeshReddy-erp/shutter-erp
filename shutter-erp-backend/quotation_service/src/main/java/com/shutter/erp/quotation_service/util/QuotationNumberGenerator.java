package com.shutter.erp.quotation_service.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.shutter.erp.quotation_service.entity.Quotation;
import com.shutter.erp.quotation_service.repository.QuotationRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class QuotationNumberGenerator {

    private final QuotationRepository quotationRepository;

    public String generateQuotationNumber() {

        String yearMonth = LocalDate.now()
                .format(DateTimeFormatter.ofPattern("yyyyMM"));

        String prefix = "QT-" + yearMonth + "-";

        Optional<Quotation> lastQuotation =
                quotationRepository.findTopByQuotationNoStartingWithOrderByQuotationNoDesc(prefix);

        int nextSequence = 1;

        if (lastQuotation.isPresent()) {

            String quotationNo = lastQuotation.get().getQuotationNo();

            String[] parts = quotationNo.split("-");

            nextSequence =
                    Integer.parseInt(parts[2]) + 1;
        }

        return prefix + String.format("%05d", nextSequence);
    }
}