package com.shutter.erp.customer_service.config;

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


//Flow of Authentication in this Configuration
//Client sends a request with JWT:
//GET /test
//Authorization: Bearer <jwt_token>
//Spring Security extracts the JWT from the header.
//JwtDecoder verifies the signature using the secret.
//JwtAuthenticationConverter reads roles from the token and creates a Collection<GrantedAuthority>.
//Spring Security creates an Authentication object and stores it in the security context.
//Endpoint access is checked:
///test → authenticated? ✅ allow
//Other endpoints → authenticated? ✅ allow
//Method-level @PreAuthorize annotations → checked against GrantedAuthoritys

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
	
	@Value("${jwt.secret}")
	private String secret;
	
	@Bean
	public JwtDecoder jwtDecoder() {
		System.out.println("jwt decoder at line 47");
	    SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	    return NimbusJwtDecoder.withSecretKey(key).build();
	}
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
System.out.println("jaagggg");
System.out.println("jaagggg");
System.out.println("jaagggg");
System.out.println("jaagggg");
System.out.println("jaagggg");
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/test").authenticated()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )
                .build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {

            System.out.println("========== JWT DEBUG ==========");
            System.out.println("Claims: " + jwt.getClaims());

            List<String> roles = jwt.getClaimAsStringList("role");
            System.out.println("Roles from JWT: " + roles);

            if (roles == null) {
                System.out.println("No roles found!");
                return List.<GrantedAuthority>of();
            }

            Collection<GrantedAuthority> authorities = roles.stream()
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                    .collect(Collectors.toList()); // <-- explicitly collect as Collection<GrantedAuthority>

            System.out.println("Authorities: " + authorities);
            System.out.println("===============================");

            return authorities;
        });

        return converter;
    }
}