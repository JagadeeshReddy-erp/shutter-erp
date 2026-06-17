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
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
	    name = "item_master",
	    uniqueConstraints = {
	        @UniqueConstraint(
	            columnNames = {"item_name", "item_type"}
	        )
	    }
	)
@EntityListeners(AuditingEntityListener.class)
public class ItemMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @NotNull(message = "Item name is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "ITEM_NAME", nullable = false, length = 50)
    private ItemName itemName;

    @NotNull(message = "Item type is required")
    @Size(max = 50, message = "Item type cannot exceed 50 characters")
    @Column(name = "ITEM_TYPE", nullable = false, length = 50)
    private String itemType;

    @DecimalMin(value = "0.0", inclusive = true,message = "Current quantity cannot be negative")
    @Column(name = "CURRENT_QUANTITY", nullable = false)
    private BigDecimal currentQuantity = BigDecimal.ZERO;

    @NotNull(message = "Selling price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Selling price must be greater than zero")
    @Column(name = "SELLING_PRICE", nullable = false)
    private BigDecimal sellingPrice;

    @Column(name = "IS_ACTIVE", nullable = false)
    private Boolean isActive = true;
    
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