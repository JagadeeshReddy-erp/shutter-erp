package com.shutter.erp.quotation_service.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Component;

@Component
public class CalculationUtil {

    public BigDecimal calculateAmount(
            BigDecimal quantity,
            BigDecimal customerPrice) {

        return quantity.multiply(customerPrice)
                .setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateProfit(
            BigDecimal quantity,
            BigDecimal referencePrice,
            BigDecimal customerPrice) {

        return customerPrice
                .subtract(referencePrice)
                .multiply(quantity)
                .setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateGstAmount(
            BigDecimal totalAmount,
            BigDecimal gstPercentage) {

        return totalAmount
                .multiply(gstPercentage)
                .divide(BigDecimal.valueOf(100),
                        2,
                        RoundingMode.HALF_UP);
    }

    public BigDecimal calculateGrandTotal(
            BigDecimal totalAmount,
            BigDecimal gstAmount) {

        return totalAmount
                .add(gstAmount)
                .setScale(2, RoundingMode.HALF_UP);
    }
}