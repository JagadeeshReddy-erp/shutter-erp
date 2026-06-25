package com.shutter.erp.inventory_service.service.impl;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.LoadFactorRequestDto;
import com.shutter.erp.inventory_service.dto.LoadFactorResponseDto;
import com.shutter.erp.inventory_service.entity.ItemMaster;
import com.shutter.erp.inventory_service.entity.LoadFactor;
import com.shutter.erp.inventory_service.repository.ItemMasterRepository;
import com.shutter.erp.inventory_service.repository.LoadFactorRepository;
import com.shutter.erp.inventory_service.service.LoadFactorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoadFactorServiceImpl implements LoadFactorService {

    private final LoadFactorRepository repository;
    private final ItemMasterRepository itemMasterRepository; // FIXED

    @Override
    public ApiResponse<LoadFactorResponseDto> create(LoadFactorRequestDto request) {

        if (repository.existsByItemId(request.getItemId())) {
            return ApiResponse.<LoadFactorResponseDto>builder()
                    .success(false)
                    .message("Load factor already exists for this item")
                    .build();
        }

        ItemMaster item = itemMasterRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        LoadFactor entity = new LoadFactor();
        entity.setItemId(request.getItemId());
        entity.setLoadFactor(request.getLoadFactor());
        entity.setDescription(request.getDescription());

        repository.save(entity);

        return ApiResponse.<LoadFactorResponseDto>builder()
                .success(true)
                .message("Load factor created successfully")
                .data(mapToDto(entity, item.getItemName().name(), item.getItemType()))
                .build();
    }

    @Override
    public ApiResponse<LoadFactorResponseDto> update(LoadFactorRequestDto request) {

        LoadFactor entity = repository.findByItemId(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Load factor not found"));

        entity.setLoadFactor(request.getLoadFactor());
        entity.setDescription(request.getDescription());

        repository.save(entity);

        ItemMaster item = itemMasterRepository.findById(request.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        return ApiResponse.<LoadFactorResponseDto>builder()
                .success(true)
                .message("Load factor updated successfully")
                .data(mapToDto(entity, item.getItemName().name(), item.getItemType()))
                .build();
    }

    @Override
    public ApiResponse<String> delete(Long id) {

        LoadFactor entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Load factor not found"));

        repository.delete(entity);

        return ApiResponse.<String>builder()
                .success(true)
                .message("Load factor deleted successfully")
                .data("Deleted")
                .build();
    }

    @Override
    public ApiResponse<LoadFactorResponseDto> getById(Long id) {

        LoadFactor entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Load factor not found"));

        ItemMaster item = itemMasterRepository.findById(entity.getItemId())
                .orElseThrow(() -> new RuntimeException("Item not found"));

        return ApiResponse.<LoadFactorResponseDto>builder()
                .success(true)
                .message("Load factor fetched successfully")
                .data(mapToDto(entity, item.getItemName().name(), item.getItemType()))
                .build();
    }

    @Override
    public ApiResponse<List<LoadFactorResponseDto>> getAll() {

        List<LoadFactorResponseDto> list = repository.findAll()
                .stream()
                .map(lf -> {

                    ItemMaster item = itemMasterRepository.findById(lf.getItemId())
                            .orElseThrow(() -> new RuntimeException("Item not found"));

                    return mapToDto(lf, item.getItemName().name(), item.getItemType());
                })
                .sorted(Comparator.comparing(LoadFactorResponseDto::getItemName))
                .collect(Collectors.toList());

        return ApiResponse.<List<LoadFactorResponseDto>>builder()
                .success(true)
                .message("Load factors fetched successfully")
                .data(list)
                .build();
    }

    private LoadFactorResponseDto mapToDto(LoadFactor lf, String itemName, String itemType) {

        LoadFactorResponseDto dto = new LoadFactorResponseDto();

        dto.setId(lf.getId());
        dto.setItemId(lf.getItemId());
        dto.setItemName(itemName);
        dto.setItemType(itemType);
        dto.setLoadFactor(lf.getLoadFactor());
        dto.setDescription(lf.getDescription());
        dto.setCreatedAt(lf.getCreatedAt());
        dto.setCreatedBy(lf.getCreatedBy());
        dto.setUpdatedAt(lf.getUpdatedAt());
        dto.setUpdatedBy(lf.getUpdatedBy());

        return dto;
    }
}