package com.shutter.erp.quotation_service.entity;

import java.math.BigDecimal;

import com.shutter.erp.quotation_service.audit.Auditable;
import com.shutter.erp.quotation_service.enums.QuotationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "QUOTATION")
public class Quotation extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "QUOTATION_NO", nullable = false, unique = true)
    private String quotationNo;

    @Column(name = "VERSION_NO")
    private Integer versionNo;

    @Column(name = "CUSTOMER_ID", nullable = false)
    private Long customerId;

    @Column(name = "TOTAL_AMOUNT")
    private BigDecimal totalAmount;

    @Column(name = "TOTAL_PROFIT")
    private BigDecimal totalProfit;

    @Column(name = "GST_PERCENTAGE")
    private BigDecimal gstPercentage;

    @Column(name = "GST_AMOUNT")
    private BigDecimal gstAmount;

    @Column(name = "GRAND_TOTAL")
    private BigDecimal grandTotal;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private QuotationStatus status;
}