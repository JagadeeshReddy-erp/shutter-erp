package com.shutter.erp.inventory_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.shutter.erp.inventory_service.dto.ApiResponse;
import com.shutter.erp.inventory_service.dto.ItemMasterRequestDto;
import com.shutter.erp.inventory_service.dto.ItemMasterResponseDto;
import com.shutter.erp.inventory_service.service.ItemMasterService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/inventory/itemMaster")
@RequiredArgsConstructor
public class ItemMasterController {

    private final ItemMasterService itemMasterService;

    @PostMapping("/createItem")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ItemMasterResponseDto>> createItem( @Valid @RequestBody ItemMasterRequestDto request) {

        return ResponseEntity.status(HttpStatus.CREATED).body(itemMasterService.createItem(request));
    }

    @GetMapping("/getAllItems")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ItemMasterResponseDto>>> getAllItems() {

        return ResponseEntity.ok(itemMasterService.getAllItems());
    }
    
    @GetMapping("/getAllActiveItems")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ItemMasterResponseDto>>> getAllActiveItems() {

        return ResponseEntity.ok(itemMasterService.getAllActiveItems());
    }
    @GetMapping("/getItemById/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ItemMasterResponseDto>> getItemById(@PathVariable Long id) {

        return ResponseEntity.ok( itemMasterService.getItemById(id));
    }
    
    @PutMapping("/updateItemMaster")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ItemMasterResponseDto>>
    updateItemMaster(@Valid @RequestBody ItemMasterRequestDto request) {

        return ResponseEntity.ok( itemMasterService.updateItemMaster(request));
    }
    
}