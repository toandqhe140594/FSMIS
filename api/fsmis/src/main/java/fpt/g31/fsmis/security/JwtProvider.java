package fpt.g31.fsmis.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtProvider {

    private static final String SECRET_KEY = "c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2";

//    private static final long JWT_EXPIRATION_BY_MILLIS = 86400000;
    private static final long JWT_EXPIRATION_BY_MILLIS = 26280000000L;


    public String generateJwtToken(Authentication authentication) {
        org.springframework.security.core.userdetails.User principal
                = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + JWT_EXPIRATION_BY_MILLIS))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Boolean validateJwtToken(String token) {
        Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .setExpiration(new Date((new Date()).getTime() + JWT_EXPIRATION_BY_MILLIS))
                .getSubject();
        return true;
    }

    public String getPhoneFromJwtToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
