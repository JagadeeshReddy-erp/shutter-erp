package com.shutter.erp.inventory_service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shutter.erp.inventory_service.entity.LoadFactor;

public interface LoadFactorRepository extends JpaRepository<LoadFactor, Long> {

    Optional<LoadFactor> findByItemId(Long itemId);

    boolean existsByItemId(Long itemId);
}