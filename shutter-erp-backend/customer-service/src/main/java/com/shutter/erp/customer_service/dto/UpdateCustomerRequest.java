package com.shutter.erp.customer_service.dto;

import com.shutter.erp.customer_service.entity.CustomerType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCustomerRequest {
	private String mobileNumber;
    private String customerName;
    private String contactPerson;
    private String alternateMobileNumber;
    private String email;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private String gstNumber;
    private CustomerType customerType;
    private String remarks;
}