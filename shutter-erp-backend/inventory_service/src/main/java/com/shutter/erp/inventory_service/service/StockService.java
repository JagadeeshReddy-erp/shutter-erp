package com.shutter.erp.inventory_service.service;

import java.time.LocalDate;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.PaginationResponse;
import com.shutter.erp.inventory_service.dto.StockRequestDto;
import com.shutter.erp.inventory_service.dto.StockResponseDto;

public interface StockService {

    ApiResponse<StockResponseDto> addStock(StockRequestDto requestDto);

    ApiResponse<PaginationResponse<StockResponseDto>>
    getStockByDateRange(LocalDate startDate, LocalDate endDate,int page,int size);

    ApiResponse<PaginationResponse<StockResponseDto>>
    getStockByItemAndDateRange( Long itemId, LocalDate startDate, LocalDate endDate, int page, int size);

}