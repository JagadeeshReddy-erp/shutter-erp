package com.shutter.erp.inventory_service.service;

import java.util.List;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.ItemMasterRequestDto;
import com.shutter.erp.inventory_service.dto.ItemMasterResponseDto;

public interface ItemMasterService {

    ApiResponse<ItemMasterResponseDto> createItem(ItemMasterRequestDto request);

    ApiResponse<List<ItemMasterResponseDto>> getAllItems();

    ApiResponse<ItemMasterResponseDto> getItemById(Long id);
    
    ApiResponse<ItemMasterResponseDto> updateItemMaster(ItemMasterRequestDto request);

	ApiResponse<List<ItemMasterResponseDto>> getAllActiveItems();
    
}