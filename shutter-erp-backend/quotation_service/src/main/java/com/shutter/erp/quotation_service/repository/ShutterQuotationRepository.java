package com.shutter.erp.quotation_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shutter.erp.quotation_service.entity.ShutterQuotation;

@Repository
public interface ShutterQuotationRepository
        extends JpaRepository<ShutterQuotation, Long> {
	void deleteByQuotationId(Long quotationId);
    List<ShutterQuotation> findByQuotationId(Long quotationId);

}