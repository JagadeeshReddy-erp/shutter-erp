package com.shutter.erp.auth_service.dto;
import com.shutter.erp.auth_service.entity.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    private String password; // optional (only update if provided)

    @NotNull(message = "Role is required")
    private Role role;
}