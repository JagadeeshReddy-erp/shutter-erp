package com.shutter.erp.inventory_service.service;

import java.util.List;

import com.shutter.erp.inventory_service.dto.*;

public interface LoadFactorService {

    ApiResponse<LoadFactorResponseDto> create(LoadFactorRequestDto request);

    ApiResponse<LoadFactorResponseDto> update(LoadFactorRequestDto request);

    ApiResponse<String> delete(Long id);

    ApiResponse<LoadFactorResponseDto> getById(Long id);

    ApiResponse<List<LoadFactorResponseDto>> getAll();
}