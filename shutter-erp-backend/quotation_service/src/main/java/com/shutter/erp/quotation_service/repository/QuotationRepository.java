package com.shutter.erp.quotation_service.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shutter.erp.quotation_service.entity.Quotation;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, Long> {

    Optional<Quotation> findTopByQuotationNoStartingWithOrderByQuotationNoDesc(String prefix);
    Optional<Quotation> findByQuotationNoAndVersionNo( String quotationNo,Integer versionNo);
    List<Quotation> findByQuotationNoOrderByVersionNoDesc(String quotationNo);
    Optional<Quotation> findByQuotationNo(String quotationNo);
    Optional<Quotation> findTopByQuotationNoOrderByVersionNoDesc(String quotationNo);
    Page<Quotation> findByCreatedAtBetween( LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);
}