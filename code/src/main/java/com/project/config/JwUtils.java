package com.project.config;


import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
@Component
public class JwUtils {
    private final SecretKey jwSecret = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final int jwExpirationMins = 86400000;

    public String generateToken(String username){
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date((new Date().getTime() + jwExpirationMins) ))
                .signWith(jwSecret)
                .compact();
    }

    public String getUsernameFromToken(String token){
        return Jwts.parser()
                .verifyWith(jwSecret)
                .build()
                .parseSignedClaims(token)
                .getPayload().getSubject();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser().verifyWith(jwSecret).build().parseSignedClaims(token);
            return true;
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
        return false;
    }
}
