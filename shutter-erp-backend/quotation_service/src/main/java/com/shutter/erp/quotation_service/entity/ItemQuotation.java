package com.shutter.erp.quotation_service.entity;

import java.math.BigDecimal;


import com.shutter.erp.quotation_service.audit.Auditable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(name = "ITEM_QUOTATION")
public class ItemQuotation extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SHUTTER_QUOTATION_ID", nullable = false)
    private Long shutterQuotationId;

    @Column(name = "ITEM_ID")
    private Long itemId;

    @Column(name = "ITEM_NAME_SNAPSHOT")
    private String itemNameSnapshot;

    @Column(name = "ITEM_TYPE_SNAPSHOT")
    private String itemTypeSnapshot;

    @Column(name = "QUANTITY")
    private BigDecimal quantity;

    @Column(name = "REFERENCE_PRICE")
    private BigDecimal referencePrice;

    @Column(name = "CUSTOMER_PRICE")
    private BigDecimal customerPrice;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    @Column(name = "PROFIT")
    private BigDecimal profit;
}