package com.shutter.erp.auth_service.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shutter.erp.auth_service.dto.ApiResponse;
import com.shutter.erp.auth_service.dto.LoginRequest;
import com.shutter.erp.auth_service.dto.LoginResponse;
import com.shutter.erp.auth_service.dto.RegisterRequest;
import com.shutter.erp.auth_service.dto.UpdateUserRequest;
import com.shutter.erp.auth_service.dto.UserProfileResponse;
import com.shutter.erp.auth_service.entity.User;
import com.shutter.erp.auth_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ApiResponse<?> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse<>(false, "Email already exists", null);
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);
        return new ApiResponse<>(true, "User Registered Successfully", null);
    }

    



public LoginResponse login(LoginRequest request) {

    User user = userRepository
            .findByEmailAndActiveTrue(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid Email or inactive user"));
    
	boolean isPasswordMatch = passwordEncoder.matches(request.getPassword(), user.getPassword());
    if (!isPasswordMatch) {
        throw new RuntimeException("Invalid Password");
    }
	String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
	return new LoginResponse(token, user.getUsername(), user.getRole().name());
}
    
    public ApiResponse<UserProfileResponse> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new ApiResponse<UserProfileResponse>(
                        true,
                        "User fetched successfully",
                        UserProfileResponse.builder()
                                .id(user.getId())
                                .username(user.getUsername())
                                .email(user.getEmail())
                                .role(user.getRole().name())
                                .active(user.isActive())
                                .build()
                ))
                .orElseGet(() -> new ApiResponse<UserProfileResponse>(
                        false,
                        "User not found with id " + id,
                        null
                ));
    }

    public ApiResponse<List<UserProfileResponse>> getAllUsers() {
        List<UserProfileResponse> users = userRepository.findAll()
                .stream()
                .map(user -> UserProfileResponse.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .active(user.isActive())
                        .build())
                .collect(Collectors.toList());

        return new ApiResponse<>(true, "All users fetched successfully", users);
    }

    
    public ApiResponse<User> updateUser(Long userId, UpdateUserRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (!user.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            return new ApiResponse<>(false, "Email already exists", null);
        }

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setActive(request.getActive());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return new ApiResponse<>(true, "User updated successfully", updatedUser);
    }

    
    public ApiResponse<UserProfileResponse> getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfileResponse profile = UserProfileResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .active(user.isActive())
                .build();

        return new ApiResponse<>(true, "Profile fetched successfully", profile);
    }
}




