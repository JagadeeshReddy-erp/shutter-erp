package com.shutter.erp.api_gateway.security;

import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Component
public class JwtAuthenticationFilter implements GatewayFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    	System.out.println("AUTH HEADER = inside filter 1");
    	System.out.println("TOKEN = 2 line" );
        String requestId = UUID.randomUUID().toString();

        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().toString();

        log.info("============================================");
        log.info("[{}] Incoming Request", requestId);
        log.info("Time     : {}", LocalDateTime.now());
        log.info("Method   : {}", method);
        log.info("Path     : {}", path);
        log.info("IP       : {}", exchange.getRequest().getRemoteAddress());

        // Allow auth endpoints
        if (path.startsWith("/auth")) {
            log.info("[{}] Public endpoint - skipping JWT validation", requestId);
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        log.info("[{}] Authorization Header: {}", requestId, authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("[{}] Missing or invalid Authorization header", requestId);
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        log.info("[{}] Extracted Token: {}", requestId, token.substring(0, Math.min(token.length(), 20)) + "...");

        try {
            Claims claims = jwtService.extractAllClaims(token);

            String username = claims.getSubject();
            String role = claims.get("roles", String.class);

            log.info("[{}] Token Valid ✔ Username: {}, Role: {}", requestId, username, role);

            ServerHttpRequest modifiedRequest = exchange.getRequest()
                    .mutate()
                    .header("X-USER", username)
                    .header("X-ROLE", role)
                    .header("X-REQUEST-ID", requestId)
                    .header(HttpHeaders.AUTHORIZATION, authHeader)
                    .build();

            log.info("[{}] Forwarding request to downstream service", requestId);
            log.info("============================================");

            return chain.filter(exchange.mutate().request(modifiedRequest).build());

        } catch (Exception e) {
            log.error("[{}] JWT validation FAILED ❌ Reason: {}", requestId, e.getMessage());
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }
}