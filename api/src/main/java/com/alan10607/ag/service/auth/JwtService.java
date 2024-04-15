package com.alan10607.ag.service.auth;

import com.alan10607.ag.model.ForumUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
@AllArgsConstructor
@Slf4j
public class JwtService {
    private static final String SECRET_KEY = "EsPKLbwWNsOtNoifyls3afApQVXy17mQTd+D22Qy5+/MiSV5eFYxEE651nY41mDt";
    private static final String EMAIL = "email";
    private static final String TOKEN_TYPE = "tokenType";
    private static final long ACCESS_TOKEN_EXPIRED_HOUR = 1;
    private static final long REFRESH_TOKEN_EXPIRED_HOUR = 24 * 30;
    public static final String ACCESS_TOKEN = HttpHeaders.AUTHORIZATION;
    public static final String REFRESH_TOKEN = "Refresh-Token";
    public static final String SET_JWT = "Set-Jwt";

    private enum TokenType {
        ACCESS_TOKEN, REFRESH_TOKEN
    }

    public String extractSubject(String token){
        return extractClaims(token, Claims::getSubject);
    }

    public String extractUsername(String token){
        return extractSubject(token);
    }

    public String extractEmail(String token) {
        return (String) extractClaims(token, c -> c.get(EMAIL));
    }

    private TokenType extractTokenType(String token) {
        String tokenTypeName = (String) extractClaims(token, c -> c.get(TOKEN_TYPE));
        return TokenType.valueOf(tokenTypeName);
    }

    public boolean extractIsAccessToken(String token) {
        return extractTokenType(token) == TokenType.ACCESS_TOKEN;
    }

    public boolean extractIsRefreshToken(String token) {
        return extractTokenType(token) == TokenType.REFRESH_TOKEN;
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private String createToken(Map<String, Object> extraClaim, UserDetails userDetails, long expiredHour){
        return Jwts.builder()
                .setClaims(extraClaim)
                .setSubject(userDetails.getUsername())//subject=username
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * expiredHour))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String createAccessToken(ForumUser forumUser){
        return createToken(
                Map.of(EMAIL, forumUser.getEmail(),
                       TOKEN_TYPE, TokenType.ACCESS_TOKEN),
                forumUser,
                ACCESS_TOKEN_EXPIRED_HOUR);
    }

    public String createRefreshToken(ForumUser forumUser){
        return createToken(
                Map.of(EMAIL, forumUser.getEmail(),
                       TOKEN_TYPE, TokenType.REFRESH_TOKEN),
                forumUser,
                REFRESH_TOKEN_EXPIRED_HOUR);
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token){
        return extractClaims(token, Claims::getExpiration);
    }

    private Date extractIssuedAt(String token){
        return extractClaims(token, Claims::getIssuedAt);
    }

    private long extractMaxAge(String token){
        return (extractExpiration(token).getTime() - extractIssuedAt(token).getTime()) / 1000;
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public void setResponseJwtCookie(HttpServletResponse response, ForumUser user){
        String accessToken = createAccessToken(user);
        String refreshToken = createRefreshToken(user);
        response.addHeader(HttpHeaders.SET_COOKIE, getCookieByJwtToken(ACCESS_TOKEN, accessToken).toString());
        response.addHeader(HttpHeaders.SET_COOKIE, getCookieByJwtToken(REFRESH_TOKEN, refreshToken).toString());
        response.addHeader(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, SET_JWT);
        response.addHeader(SET_JWT, getJwtHeaderValue(accessToken, refreshToken));//for situation when phone's browser rejects cross-site cookies
    }

    private String getJwtHeaderValue(String accessToken, String refreshToken) {
        try {
            Map<String, String> jwtHeader = Map.of(ACCESS_TOKEN, accessToken, REFRESH_TOKEN, refreshToken);
            return new ObjectMapper().writeValueAsString(jwtHeader);
        } catch (JsonProcessingException e) {
            log.error("Failed to create Jwt Header string", e);
        }
        return "";
    }

    private ResponseCookie getCookieByJwtToken(String cookieName, String token) {
        return ResponseCookie.from(cookieName, token)
                .maxAge(extractMaxAge(token))
                .path("/")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")//or default value is Lax
                .build();
    }

}