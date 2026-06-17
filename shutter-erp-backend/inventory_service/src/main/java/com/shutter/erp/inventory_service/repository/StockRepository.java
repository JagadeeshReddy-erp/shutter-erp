package com.shutter.erp.inventory_service.repository;


import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shutter.erp.inventory_service.entity.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    Page<Stock> findByCreatedAtBetween(LocalDateTime startDate,LocalDateTime endDate,Pageable pageable);

    Page<Stock> findByItemMasterIdAndCreatedAtBetween(Long itemId, LocalDateTime startDate,  LocalDateTime endDate, Pageable pageable);
}