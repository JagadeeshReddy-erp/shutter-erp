package com.shutter.erp.auth_service.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shutter.erp.auth_service.dto.ApiResponse;
import com.shutter.erp.auth_service.dto.LoginRequest;
import com.shutter.erp.auth_service.dto.LoginResponse;
import com.shutter.erp.auth_service.dto.RegisterRequest;
import com.shutter.erp.auth_service.dto.UpdateUserRequest;
import com.shutter.erp.auth_service.dto.UserProfileResponse;
import com.shutter.erp.auth_service.entity.User;
import com.shutter.erp.auth_service.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest request) {
        ApiResponse<?> response = authService.register(request);

        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login( @Valid @RequestBody LoginRequest request) {
  
      return ResponseEntity.ok(authService.login(request));
  }

    @GetMapping("/id/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getUserById(@PathVariable Long id) {
        ApiResponse<UserProfileResponse> response = authService.getUserById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserProfileResponse>>> getAllUsers() {
        ApiResponse<List<UserProfileResponse>> response = authService.getAllUsers();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<User>> updateUser(
            @PathVariable("id") Long userId,
            @Valid @RequestBody UpdateUserRequest request) {

        ApiResponse<User> response = authService.updateUser(userId, request);

        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    
    
    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<UserProfileResponse>> profile(Principal principal) {
        ApiResponse<UserProfileResponse> response = authService.getProfile(principal.getName());
        return ResponseEntity.ok(response);
    }
}














//@PostMapping("/login")
//public ResponseEntity<LoginResponse> login( @Valid @RequestBody LoginRequest request) {
//
//    return ResponseEntity.ok(authService.login(request));
//}