package com.shutter.erp.customer_service.controller;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shutter.erp.customer_service.common.PaginationResponse;
import com.shutter.erp.customer_service.dto.ApiResponse;
import com.shutter.erp.customer_service.dto.CreateCustomerRequest;
import com.shutter.erp.customer_service.dto.CustomerResponse;
import com.shutter.erp.customer_service.dto.UpdateCustomerRequest;
import com.shutter.erp.customer_service.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@Validated
public class CustomerController {

	private final CustomerService customerService;

	@PreAuthorize("hasRole('ADMIN')")
//  @PreAuthorize("hasRole('EMPLOYEE')")
	@PostMapping("/CreateCustomer")
	public ResponseEntity<ApiResponse<?>> createCustomer(@Valid @RequestBody CreateCustomerRequest request) {

		ApiResponse<?> response = customerService.createCustomer(request);

		if (!response.isSuccess()) {
			return ResponseEntity.badRequest().body(response);
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	
	
	@PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
	@GetMapping("/getAllCustomersByDateRange")
	public ResponseEntity<ApiResponse<PaginationResponse<CustomerResponse>>> getAllCustomers(
	        @RequestParam int page,
	        @RequestParam int size,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {

	    return ResponseEntity.ok(
	            customerService.getAllCustomers(
	                    page,
	                    size,
	                    fromDate,
	                    toDate
	            )
	    );
	}

	

	@PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
	@GetMapping("/mobile")
	public ResponseEntity<ApiResponse<PaginationResponse<CustomerResponse>>> searchCustomersByMobile(
	        @RequestParam String mobileNumber,
	        @RequestParam int page,
	        @RequestParam int size) {

	    return ResponseEntity.ok(
	            customerService.searchCustomersByMobileNumber(
	                    mobileNumber, page, size));
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
	@GetMapping("/name")
	public ResponseEntity<ApiResponse<PaginationResponse<CustomerResponse>>> searchCustomersByName(
	        @RequestParam String name,
	        @RequestParam int page,
	        @RequestParam int size) {

	    return ResponseEntity.ok(
	            customerService.searchCustomersByName(name, page, size));
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<CustomerResponse>>
	getCustomerById(@PathVariable Long id) {

	    CustomerResponse customer =
	            customerService.getCustomerById(id);

	    return ResponseEntity.ok(
	            ApiResponse.<CustomerResponse>builder()
	                    .success(true)
	                    .message("Customer fetched successfully")
	                    .data(customer)
	                    .build());
	}
	
	@PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<CustomerResponse>>
	updateCustomer(
	        @PathVariable Long id,
	        @RequestBody UpdateCustomerRequest request) {

	    CustomerResponse response =
	            customerService.updateCustomer(id, request);

	    return ResponseEntity.ok(
	            ApiResponse.<CustomerResponse>builder()
	                    .success(true)
	                    .message("Customer updated successfully")
	                    .data(response)
	                    .build());
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<?>> deleteCustomer(
	        @PathVariable Long id) {

	    customerService.deleteCustomer(id);

	    return ResponseEntity.ok(
	            ApiResponse.builder()
	                    .success(true)
	                    .message("Customer deleted successfully")
	                    .build());
	}
	

	@PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
	@GetMapping("/test")
	public String test(@RequestHeader(value = "Authorization", required = false) String auth) {

		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		System.out.println("User accessing /test: " + username);
		return username + "----------Hello-------- " + (auth == null ? "NO HEADER" : auth);
	}
	
	
}