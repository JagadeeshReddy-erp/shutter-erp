package com.shutter.erp.auth_service.config;

import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
	

	@Bean
	public JwtDecoder jwtDecoder() {
		SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
		return NimbusJwtDecoder.withSecretKey(key).build();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		return http.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(
						auth -> auth.requestMatchers("/auth/login").permitAll().anyRequest().authenticated())
				.oauth2ResourceServer(
						oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())))
				.build();
	}

	@Bean
	public JwtAuthenticationConverter jwtAuthenticationConverter() {

		JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

		converter.setJwtGrantedAuthoritiesConverter(jwt -> {

			String role = jwt.getClaimAsString("role");

			if (role == null) {
				return List.of();
			}

			return List.of(new SimpleGrantedAuthority("ROLE_" + role));
		});

		return converter;
	}
}