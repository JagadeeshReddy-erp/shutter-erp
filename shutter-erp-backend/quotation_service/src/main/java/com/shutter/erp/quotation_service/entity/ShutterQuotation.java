package com.shutter.erp.quotation_service.entity;

import java.math.BigDecimal;

import com.shutter.erp.quotation_service.audit.Auditable;
import com.shutter.erp.quotation_service.enums.ShutterStatus;

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
@Table(name = "SHUTTER_QUOTATION")
public class ShutterQuotation extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "QUOTATION_ID", nullable = false)
    private Long quotationId;

    @Column(name = "SHUTTER_NO")
    private Integer shutterNo;

    @Column(name = "WIDTH")
    private BigDecimal width;

    @Column(name = "HEIGHT")
    private BigDecimal height;

    @Column(name = "SHUTTER_TOTAL_AMOUNT")
    private BigDecimal shutterTotalAmount;

    @Column(name = "SHUTTER_TOTAL_PROFIT")
    private BigDecimal shutterTotalProfit;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private ShutterStatus status;
}