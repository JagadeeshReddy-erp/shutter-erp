package com.shutter.erp.api_gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.shutter.erp.api_gateway.security.JwtAuthenticationFilter;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder,
                                     JwtAuthenticationFilter jwtFilter) {

        return builder.routes()

                // AUTH SERVICE (no JWT needed for login/register)
                .route("auth-service", r -> r.path("/auth/**")
                        .uri("lb://auth-service"))

                // CUSTOMER SERVICE (JWT required)
                .route("customer-service", r -> r.path("/customers/**")
                        .filters(f -> f.filter(jwtFilter))
                        .uri("lb://customer-service"))

                .build();
    }
    
}