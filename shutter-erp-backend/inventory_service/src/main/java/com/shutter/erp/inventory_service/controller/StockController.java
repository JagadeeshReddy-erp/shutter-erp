package com.shutter.erp.inventory_service.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.PaginationResponse;
import com.shutter.erp.inventory_service.dto.StockRequestDto;
import com.shutter.erp.inventory_service.dto.StockResponseDto;
import com.shutter.erp.inventory_service.service.StockService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/inventory/stock")
@RequiredArgsConstructor
public class StockController {

	private final StockService stockService;

	@PostMapping("/addStock")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<StockResponseDto>> addStock(@Valid @RequestBody StockRequestDto requestDto) {

		return ResponseEntity.ok(stockService.addStock(requestDto));
	}

	@GetMapping("/date-range")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<PaginationResponse<StockResponseDto>>> getStockByDateRange(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		return ResponseEntity.ok(stockService.getStockByDateRange(startDate, endDate, page, size));
	}

	@GetMapping("/item/{itemId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse<PaginationResponse<StockResponseDto>>> getStockByItemAndDateRange(
			@PathVariable Long itemId,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		return ResponseEntity.ok(stockService.getStockByItemAndDateRange(itemId, startDate, endDate, page, size));
	}
}