package com.skt.JWT;

import io.jsonwebtoken.Claims;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {

    private final JwtUtil jwtUtil;

    public JwtController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/renew-token")
    public String renewToken(@RequestHeader("Authorization") String token) {

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (jwtUtil.isTokenExpired(token)) {
            throw new RuntimeException("Token expirado");
        }

        Claims claims = jwtUtil.extractAllClaims(token);
        String username = claims.getSubject();
        String role = (String) claims.get("role");

        return jwtUtil.generateToken(username, role);
    }
}