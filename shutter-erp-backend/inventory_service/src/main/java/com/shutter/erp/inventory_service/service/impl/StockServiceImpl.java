package com.shutter.erp.inventory_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.PaginationResponse;
import com.shutter.erp.inventory_service.dto.StockRequestDto;
import com.shutter.erp.inventory_service.dto.StockResponseDto;
import com.shutter.erp.inventory_service.entity.ItemMaster;
import com.shutter.erp.inventory_service.entity.Stock;
import com.shutter.erp.inventory_service.repository.ItemMasterRepository;
import com.shutter.erp.inventory_service.repository.StockRepository;
import com.shutter.erp.inventory_service.service.StockService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;

    private final ItemMasterRepository itemMasterRepository;

    @Override
    public ApiResponse<StockResponseDto> addStock(StockRequestDto requestDto) {

        ItemMaster itemMaster = itemMasterRepository
                .findById(requestDto.getItemId())
                .orElseThrow(() ->new RuntimeException("Item not found with ID : " + requestDto.getItemId()));

        Stock stock = new Stock();
        stock.setItemMaster(itemMaster);
        stock.setQuantity(requestDto.getQuantity());
        stock.setPurchasePrice(requestDto.getPurchasePrice());
        Stock savedStock = stockRepository.save(stock);

        BigDecimal updatedQuantity = itemMaster.getCurrentQuantity().add(requestDto.getQuantity());
        itemMaster.setCurrentQuantity(updatedQuantity);
        itemMasterRepository.save(itemMaster);

        StockResponseDto response = mapToResponse(savedStock);

        return ApiResponse.<StockResponseDto>builder()
                .success(true)
                .message("Stock added successfully")
                .data(response)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ApiResponse<PaginationResponse<StockResponseDto>> getStockByDateRange (
    		LocalDate startDate,LocalDate endDate,int page,int size) {

        Pageable pageable = PageRequest.of(page, size);

        LocalDateTime start = startDate.atStartOfDay();

        LocalDateTime end = endDate.atTime(LocalTime.MAX);

        Page<Stock> stockPage =stockRepository.findByCreatedAtBetween(start,end,pageable);

        return buildPaginationResponse(stockPage,"Stock records fetched successfully");
    }

    @Override
    @Transactional(readOnly = true)
	public ApiResponse<PaginationResponse<StockResponseDto>> getStockByItemAndDateRange(
			Long itemId,LocalDate startDate, LocalDate endDate, int page, int size) {

		itemMasterRepository.findById(itemId)
				.orElseThrow(() -> new RuntimeException("Item not found with ID : " + itemId));

        Pageable pageable = PageRequest.of(page, size);

        LocalDateTime start = startDate.atStartOfDay();

        LocalDateTime end = endDate.atTime(LocalTime.MAX);

        Page<Stock> stockPage =
                stockRepository .findByItemMasterIdAndCreatedAtBetween(itemId,start,end,pageable);

		return buildPaginationResponse(stockPage, "Item stock records fetched successfully");
    }

	private ApiResponse<PaginationResponse<StockResponseDto>> buildPaginationResponse(
			Page<Stock> stockPage,String message) {

        List<StockResponseDto> stockResponses =
                stockPage.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        PaginationResponse<StockResponseDto> paginationResponse =
                PaginationResponse.<StockResponseDto>builder()
                        .content(stockResponses)
                        .pageNumber(stockPage.getNumber())
                        .pageSize(stockPage.getSize())
                        .totalElements(stockPage.getTotalElements())
                        .totalPages(stockPage.getTotalPages())
                        .last(stockPage.isLast())
                        .build();

        return ApiResponse
                .<PaginationResponse<StockResponseDto>>builder()
                .success(true)
                .message(message)
                .data(paginationResponse)
                .build();
    }

    private StockResponseDto mapToResponse(Stock stock) {

        return StockResponseDto.builder()
                .stockId(stock.getId())
                .itemId(stock.getItemMaster().getId())
                .itemName(stock.getItemMaster().getItemName().name())
                .itemType(stock.getItemMaster().getItemType())
                .quantity(stock.getQuantity())
                .purchasePrice(stock.getPurchasePrice())
                .createdAt(stock.getCreatedAt())
                .createdBy(stock.getCreatedBy())
                .build();
    }
}