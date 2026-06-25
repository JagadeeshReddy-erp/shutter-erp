package com.shutter.erp.inventory_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.LoadFactorRequestDto;
import com.shutter.erp.inventory_service.dto.LoadFactorResponseDto;
import com.shutter.erp.inventory_service.service.LoadFactorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/inventory/loadFactor")
@RequiredArgsConstructor
public class LoadFactorController {

    private final LoadFactorService loadFactorService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LoadFactorResponseDto>> create(
            @Valid @RequestBody LoadFactorRequestDto request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(loadFactorService.create(request));
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LoadFactorResponseDto>> update(
            @Valid @RequestBody LoadFactorRequestDto request) {

        return ResponseEntity.ok(loadFactorService.update(request));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable Long id) {
        return ResponseEntity.ok(loadFactorService.delete(id));
    }

    @GetMapping("/getById/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<LoadFactorResponseDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(loadFactorService.getById(id));
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<LoadFactorResponseDto>>> getAll() {
        return ResponseEntity.ok(loadFactorService.getAll());
    }
}