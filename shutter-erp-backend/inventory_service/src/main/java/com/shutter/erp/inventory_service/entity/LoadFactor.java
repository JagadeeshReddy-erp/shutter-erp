package com.shutter.erp.inventory_service.entity;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(
    name = "load_factor",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"item_id"})
    }
)
@EntityListeners(AuditingEntityListener.class)
public class LoadFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    // Link to ItemMaster
    @NotNull(message = "Item id is required")
    @Column(name = "ITEM_ID", nullable = false)
    private Long itemId;

    // How much load this item consumes per unit
    @NotNull(message = "Load factor is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Load factor must be greater than 0")
    @Column(name = "LOAD_FACTOR", nullable = false, precision = 10, scale = 2)
    private BigDecimal loadFactor;

    // Optional description (planning purpose)
    @Column(name = "DESCRIPTION", length = 255)
    private String description;

    @CreatedDate
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @CreatedBy
    @Column(name = "CREATED_BY", updatable = false)
    private String createdBy;

    @LastModifiedDate
    @Column(name = "UPDATED_AT")
    private LocalDateTime updatedAt;

    @LastModifiedBy
    @Column(name = "UPDATED_BY")
    private String updatedBy;
}