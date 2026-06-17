package com.shutter.erp.inventory_service.config;

import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

import io.jsonwebtoken.security.Keys;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public JwtDecoder jwtDecoder() {

        SecretKey key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8));

        return NimbusJwtDecoder.withSecretKey(key).build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt ->
                                jwt.jwtAuthenticationConverter(
                                        jwtAuthenticationConverter())))
                .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {

            List<String> roles =
                    jwt.getClaimAsStringList("role");

            if (roles == null) {
                return List.<GrantedAuthority>of();
            }

            Collection<GrantedAuthority> authorities =
                    roles.stream()
                            .map(role ->
                                    new SimpleGrantedAuthority(
                                            "ROLE_" + role))
                            .collect(Collectors.toList());

            return authorities;
        });

        return converter;
    }
}