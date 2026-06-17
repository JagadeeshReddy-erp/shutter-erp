package com.shutter.erp.inventory_service.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "STOCK")
@EntityListeners(AuditingEntityListener.class)
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotNull(message = "Item is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ITEM_ID", nullable = false)
    private ItemMaster itemMaster;

    @NotNull(message = "Quantity is required")
    @DecimalMin(
            value = "0.0",
            inclusive = false,
            message = "Quantity must be greater than zero")
    @Column(name = "QUANTITY", nullable = false)
    private BigDecimal quantity;

    @NotNull(message = "Purchase price is required")
    @DecimalMin(
            value = "0.0",
            inclusive = false,
            message = "Purchase price must be greater than zero")
    @Column(name = "PURCHASE_PRICE", nullable = false)
    private BigDecimal purchasePrice;

    @CreatedDate
    @Column(name = "CREATED_AT", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @CreatedBy
    @Column(name = "CREATED_BY", nullable = false, updatable = false)
    private String createdBy;

    @LastModifiedDate
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @LastModifiedBy
    @Column(name = "UPDATED_BY")
    private String updatedBy;
}