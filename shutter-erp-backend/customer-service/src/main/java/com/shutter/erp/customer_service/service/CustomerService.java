package com.shutter.erp.customer_service.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.shutter.erp.customer_service.common.PaginationResponse;
import com.shutter.erp.customer_service.dto.ApiResponse;
import com.shutter.erp.customer_service.dto.CreateCustomerRequest;
import com.shutter.erp.customer_service.dto.CustomerResponse;
import com.shutter.erp.customer_service.dto.UpdateCustomerRequest;
import com.shutter.erp.customer_service.entity.Customer;
import com.shutter.erp.customer_service.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

	public ApiResponse<CustomerResponse> createCustomer(CreateCustomerRequest request) {

		if (customerRepository.existsByMobileNumber(request.getMobileNumber())) {
			return ApiResponse.<CustomerResponse>builder()
					.success(false)
					.message("Mobile number already exists")
					.build();
		}

        Customer customer = Customer.builder()
                .customerName(request.getCustomerName())
                .contactPerson(request.getContactPerson())
                .mobileNumber(request.getMobileNumber())
                .alternateMobileNumber(request.getAlternateMobileNumber())
                .email(request.getEmail())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .gstNumber(request.getGstNumber())
                .customerType(request.getCustomerType())
                .remarks(request.getRemarks())
                .build();

        Customer savedCustomer =
                customerRepository.save(customer);

        return ApiResponse.<CustomerResponse>builder()
                .success(true)
                .message("Customer created successfully")
                .data(mapToResponse(savedCustomer))
                .build();
    }

    public CustomerResponse getCustomerById(Long id) {
        return mapToResponse(getCustomer(id));
    }

//	public CustomerResponse getCustomerByMobileNumber(String mobileNumber) {
//		Customer customer = customerRepository.findByMobileNumber(mobileNumber)
//				.orElseThrow(() -> new RuntimeException("Customer not found"));
//
//		return mapToResponse(customer);
//	}
    
    public ApiResponse<PaginationResponse<CustomerResponse>> searchCustomersByMobileNumber(
            String mobileNumber,
            int page,
            int size) {

        Sort sort = Sort.by("createdAt").descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Customer> customerPage =
                customerRepository.findByMobileNumberContaining(mobileNumber, pageable);

        List<CustomerResponse> customerResponses =
                customerPage.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        PaginationResponse<CustomerResponse> paginationResponse =
                new PaginationResponse<>(
                        customerResponses,
                        customerPage.getNumber(),
                        customerPage.getSize(),
                        customerPage.getTotalElements(),
                        customerPage.getTotalPages(),
                        customerPage.isLast()
                );

        return ApiResponse.<PaginationResponse<CustomerResponse>>builder()
                .success(true)
                .message("Customers fetched successfully")
                .data(paginationResponse)
                .build();
    }

    public ApiResponse<PaginationResponse<CustomerResponse>> searchCustomersByName(
            String name,
            int page,
            int size) {

        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Customer> customerPage =
                customerRepository.findByCustomerNameContainingIgnoreCase(name, pageable);

        List<CustomerResponse> customerResponses =
                customerPage.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        PaginationResponse<CustomerResponse> paginationResponse =
                new PaginationResponse<>(
                        customerResponses,
                        customerPage.getNumber(),
                        customerPage.getSize(),
                        customerPage.getTotalElements(),
                        customerPage.getTotalPages(),
                        customerPage.isLast()
                );

        return ApiResponse.<PaginationResponse<CustomerResponse>>builder()
                .success(true)
                .message("Customers fetched successfully")
                .data(paginationResponse)
                .build();
    }
    
    public ApiResponse<PaginationResponse<CustomerResponse>> getAllCustomers(
            int page,
            int size,
            LocalDate fromDate,
            LocalDate toDate) {

        Sort sort = Sort.by("createdAt").descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        LocalDateTime startDateTime = fromDate.atStartOfDay();
        LocalDateTime endDateTime = toDate.atTime(LocalTime.MAX);

        Page<Customer> customerPage =
                customerRepository.findByCreatedAtBetween(
                        startDateTime,
                        endDateTime,
                        pageable);

        List<CustomerResponse> customerResponses =
                customerPage.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        PaginationResponse<CustomerResponse> paginationResponse =
                new PaginationResponse<>(
                        customerResponses,
                        customerPage.getNumber(),
                        customerPage.getSize(),
                        customerPage.getTotalElements(),
                        customerPage.getTotalPages(),
                        customerPage.isLast()
                );

        return ApiResponse.<PaginationResponse<CustomerResponse>>builder()
                .success(true)
                .message("Customers fetched successfully")
                .data(paginationResponse)
                .build();
    }

    public CustomerResponse updateCustomer(Long id,UpdateCustomerRequest request) {

        Customer customer = getCustomer(id);

        customer.setCustomerName(request.getCustomerName());
        customer.setMobileNumber(request.getMobileNumber());
        customer.setContactPerson(request.getContactPerson());
        customer.setAlternateMobileNumber(request.getAlternateMobileNumber());
        customer.setEmail(request.getEmail());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());
        customer.setGstNumber(request.getGstNumber());
        customer.setCustomerType(request.getCustomerType());
        customer.setRemarks(request.getRemarks());

        Customer updated = customerRepository.save(customer);

        return mapToResponse(updated);
    }

    public void deleteCustomer(Long id) {
        customerRepository.delete(getCustomer(id));
    }

	private Customer getCustomer(Long id) {
		return customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
	}

    private CustomerResponse mapToResponse(Customer customer) {
        return CustomerResponse.builder()
                .id(customer.getId())
                .customerName(customer.getCustomerName())
                .contactPerson(customer.getContactPerson())
                .mobileNumber(customer.getMobileNumber())
                .alternateMobileNumber(customer.getAlternateMobileNumber())
                .email(customer.getEmail())
                .address(customer.getAddress())
                .city(customer.getCity())
                .state(customer.getState())
                .pincode(customer.getPincode())
                .gstNumber(customer.getGstNumber())
                .customerType(customer.getCustomerType())
                .remarks(customer.getRemarks())
                .createdBy(customer.getCreatedBy())
                .createdAt(customer.getCreatedAt())
                .updatedBy(customer.getUpdatedBy())
                .updatedAt(customer.getUpdatedAt())
                .build();
    }
}