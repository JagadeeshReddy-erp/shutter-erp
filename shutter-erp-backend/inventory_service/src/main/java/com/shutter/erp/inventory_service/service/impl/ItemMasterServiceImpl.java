package com.shutter.erp.inventory_service.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.ItemMasterRequestDto;
import com.shutter.erp.inventory_service.dto.ItemMasterResponseDto;
import com.shutter.erp.inventory_service.entity.ItemMaster;
import com.shutter.erp.inventory_service.repository.ItemMasterRepository;
import com.shutter.erp.inventory_service.repository.LoadFactorRepository;
import com.shutter.erp.inventory_service.service.ItemMasterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemMasterServiceImpl implements ItemMasterService {

    private final ItemMasterRepository itemMasterRepository;
    private final LoadFactorRepository loadFactorRepository;
    
    @Override
    public ApiResponse<ItemMasterResponseDto> createItem(
            ItemMasterRequestDto request) {

        boolean exists = itemMasterRepository
                .existsByItemNameAndItemTypeIgnoreCase(
                        request.getItemName(),
                        request.getItemType().trim());

        if (exists) {
            throw new RuntimeException(
                    "Item already exists with name : "+ request.getItemName() + " and type : " + request.getItemType().trim());
        }

        ItemMaster itemMaster = new ItemMaster();
        itemMaster.setIsActive(request.isActive());
        itemMaster.setItemName(request.getItemName());
        itemMaster.setItemType(request.getItemType().trim());
        itemMaster.setSellingPrice(request.getSellingPrice());
        itemMaster.setCurrentQuantity(BigDecimal.ZERO);

        ItemMaster savedItem = itemMasterRepository.save(itemMaster);

        return ApiResponse.<ItemMasterResponseDto>builder()
                .success(true)
                .message("Item created successfully")
                .data(mapToResponse(savedItem))
                .build();
    }
    
    @Override
    public ApiResponse<List<ItemMasterResponseDto>> getAllItems() {

        List<ItemMasterResponseDto> items = itemMasterRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();

        return ApiResponse.<List<ItemMasterResponseDto>>builder()
                .success(true)
                .message("Active items fetched successfully")
                .data(items)
                .build();
    }

    @Override
    public ApiResponse<List<ItemMasterResponseDto>> getAllActiveItems() {

        // 1. Load all load factors in one DB call
        Map<Long, BigDecimal> loadFactorMap = loadFactorRepository.findAll()
                .stream()
                .collect(Collectors.toMap(
                        lf -> lf.getItemId(),
                        lf -> lf.getLoadFactor()
                ));

        // 2. Build response
        List<ItemMasterResponseDto> items = itemMasterRepository.findByIsActiveTrue()
                .stream()
                .map(item -> {

                    BigDecimal loadFactor = loadFactorMap.getOrDefault(
                            item.getId(),
                            BigDecimal.ZERO
                    );

                    return ItemMasterResponseDto.builder()
                            .id(item.getId())
                            .itemName(item.getItemName())
                            .itemType(item.getItemType())
                            .currentQuantity(item.getCurrentQuantity())
                            .sellingPrice(item.getSellingPrice())
                            .loadFactor(loadFactor)   // ✅ injected value
                            .isActive(item.getIsActive())
                            .createdAt(item.getCreatedAt())
                            .createdBy(item.getCreatedBy())
                            .updatedAt(item.getUpdatedAt())
                            .updatedBy(item.getUpdatedBy())
                            .build();
                })
                .toList();

        return ApiResponse.<List<ItemMasterResponseDto>>builder()
                .success(true)
                .message("Active items fetched successfully")
                .data(items)
                .build();
    }
    
    @Override
    public ApiResponse<ItemMasterResponseDto> getItemById(Long id) {

        ItemMaster item = itemMasterRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Item not found with id : " + id));

        return ApiResponse.<ItemMasterResponseDto>builder()
                .success(true)
                .message("Item fetched successfully")
                .data(mapToResponse(item))
                .build();
    }
    
    @Override
    public ApiResponse<ItemMasterResponseDto> updateItemMaster(
            ItemMasterRequestDto request) {

        ItemMaster item = itemMasterRepository
                .findByItemNameAndItemTypeIgnoreCase(
                        request.getItemName(),
                        request.getItemType().trim())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Item not found with name : " + request.getItemName() +" and type : " + request.getItemType()));

        item.setSellingPrice(request.getSellingPrice());
        item.setIsActive(request.isActive());
        ItemMaster updatedItem = itemMasterRepository.save(item);

        return ApiResponse.<ItemMasterResponseDto>builder()
                .success(true)
                .message("items updated successfully")
                .data(mapToResponse(updatedItem))
                .build();
    }

    
    private ItemMasterResponseDto mapToResponse(ItemMaster item) {

        return ItemMasterResponseDto.builder()
                .id(item.getId())
                .itemName(item.getItemName())
                .itemType(item.getItemType())
                .currentQuantity(item.getCurrentQuantity())
                .sellingPrice(item.getSellingPrice())
                .isActive(item.getIsActive())
                .createdAt(item.getCreatedAt())
                .createdBy(item.getCreatedBy())
                .updatedAt(item.getUpdatedAt())
                .updatedBy(item.getUpdatedBy())
                .build();
    }
}