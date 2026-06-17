package com.shutter.erp.inventory_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shutter.erp.inventory_service.entity.ItemMaster;
import com.shutter.erp.inventory_service.entity.ItemName;

@Repository
public interface ItemMasterRepository extends JpaRepository<ItemMaster, Long> {

    boolean existsByItemNameAndItemTypeIgnoreCase(
    		ItemName itemName,
            String itemType);

    Optional<ItemMaster> findByItemNameAndItemTypeIgnoreCase(
    		ItemName itemName,
            String itemType);

    List<ItemMaster> findByIsActiveTrue();

}