package com.shutter.erp.customer_service.dto;

import java.time.LocalDateTime;

import com.shutter.erp.customer_service.entity.CustomerType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponse {

    private Long id;

    private String customerName;

    private String contactPerson;

    private String mobileNumber;

    private String alternateMobileNumber;

    private String email;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private String gstNumber;

    private CustomerType customerType;

    private String createdBy;
    
    private LocalDateTime createdAt;
    
    private String updatedBy;
    
    private LocalDateTime updatedAt;
    
    private String remarks;
}