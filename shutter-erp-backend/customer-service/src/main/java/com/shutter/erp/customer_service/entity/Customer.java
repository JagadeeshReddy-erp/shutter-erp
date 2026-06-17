package com.shutter.erp.customer_service.entity;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "customers")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "customer_name", nullable = false, length = 150)
	private String customerName;

	@Column(name = "contact_person", length = 100)
	private String contactPerson;

	@Column(name = "mobile_number", nullable = false, unique = true, length = 15)
	private String mobileNumber;

	@Column(name = "alternate_mobile_number", length = 15)
	private String alternateMobileNumber;

	@Column(length = 100)
	private String email;

	@Column(length = 255)
	private String address;

	@Column(length = 50)
	private String city;

	@Column(length = 50)
	private String state;

	@Column(length = 10)
	private String pincode;

	@Column(name = "gst_number", length = 20)
	private String gstNumber;

	@Enumerated(EnumType.STRING)
	private CustomerType customerType;

	@Column(length = 500)
	private String remarks;
	
	@CreatedBy
    @Column(name = "created_by", length = 100, updatable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedBy
    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}