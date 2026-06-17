package com.shutter.erp.customer_service.dto;

import com.shutter.erp.customer_service.entity.CustomerType;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCustomerRequest {

    @NotBlank
    private String customerName;

    private String contactPerson;

    @NotBlank
    private String mobileNumber;

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