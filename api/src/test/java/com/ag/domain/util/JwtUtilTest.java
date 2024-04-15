package com.ag.domain.util;

import com.ag.domain.constant.TokenType;
import com.google.common.collect.ImmutableMap;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

class JwtUtilTest {

    @Test
    public void testCreateToken() {
        // Arrange
        Map<String, Object> extraClaims = ImmutableMap.<String, Object>builder()
                .put("id", "testId")
                .put("username", "testUsername")
                .put("tokenType", TokenType.ACCESS_TOKEN)
                .build();
        long expiredHour = 1;
        String subject = "testSubject";
        long now = System.currentTimeMillis();

        // Act
        String token = JwtUtil.createToken(extraClaims, subject, expiredHour);
        Claims claims = JwtUtil.extractAllClaims(token);

        assertEquals(extraClaims.get("id"), claims.get("id"));
        assertEquals(extraClaims.get("username"), claims.get("username"));
        assertEquals(extraClaims.get("tokenType"), TokenType.valueOf((String) claims.get("tokenType")));
        assertEquals(subject, claims.getSubject());
        assertEquals(now, claims.getIssuedAt().getTime(), 1000);
        assertEquals(now + Duration.ofHours(expiredHour).toMillis(), claims.getExpiration().getTime(), 1000);
        assertFalse(JwtUtil.isTokenExpired(token));
    }
}