package com.shutter.erp.auth_service.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    
    public String generateToken(
            String email,
            String role) {

        Map<String, Object> claims =
                new HashMap<>();

        claims.put("role", role);

        return Jwts.builder()
                .claims(claims)
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignKey(), Jwts.SIG.HS256)
                .compact();
    }
    
    private SecretKey getSignKey() {
    	System.out.println("AUTH SECRET = [" + secret + "]");
    	System.out.println("LENGTH = " + secret.length());
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)); // default works for HS256
    }
    
	 
}