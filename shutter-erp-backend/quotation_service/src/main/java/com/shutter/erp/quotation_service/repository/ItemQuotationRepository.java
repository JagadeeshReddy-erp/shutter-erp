package com.shutter.erp.quotation_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shutter.erp.quotation_service.entity.ItemQuotation;

@Repository
public interface ItemQuotationRepository
        extends JpaRepository<ItemQuotation, Long> {
	void deleteByShutterQuotationId(Long shutterQuotationId);
    List<ItemQuotation> findByShutterQuotationId(Long shutterQuotationId);

}