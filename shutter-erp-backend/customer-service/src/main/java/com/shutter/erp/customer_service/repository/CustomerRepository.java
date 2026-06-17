package com.shutter.erp.customer_service.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.shutter.erp.customer_service.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	Page<Customer> findByCustomerNameContainingIgnoreCase(String customerName, Pageable pageable);
	
	Page<Customer> findByMobileNumberContaining(String mobileNumber, Pageable pageable);
	
	boolean existsByMobileNumber(String mobileNumber);
	
	Page<Customer> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}