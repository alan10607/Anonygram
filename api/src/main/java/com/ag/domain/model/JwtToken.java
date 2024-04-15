package com.ag.domain.model;

import com.ag.domain.constant.TokenType;
import com.ag.domain.util.JwtUtil;
import com.google.common.collect.ImmutableMap;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.MalformedJwtException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.Map;

@Data
@Slf4j
public class JwtToken {
    private String value;
    private String userId;
    private TokenType tokenType;
    private String subject;
    private Date issuedAt;
    private Date expiration;

    private static final String CLAIM_NAME_ID = "userId";
    private static final String CLAIM_NAME_TOKEN_TYPE = "tokenType";

    public JwtToken(DefaultTokenBuilder builder) {
        init(createToken(builder.user, builder.tokenType));
    }

    public JwtToken(ParseFromTokenBuilder builder) {
        init(builder.token);
    }

    private void init(String token){
        try {
            Claims claims = JwtUtil.extractAllClaims(token);
            this.value = token;
            this.userId = (String) claims.get(CLAIM_NAME_ID);
            this.tokenType = TokenType.valueOf((String) claims.get(CLAIM_NAME_TOKEN_TYPE));
            this.subject = claims.getSubject();
            this.issuedAt = claims.getIssuedAt();
            this.expiration = claims.getExpiration();
        }catch (MalformedJwtException e){
            log.error("Failed to extract JWT", e);
            throw new RuntimeException("Failed to extract JWT");
        }

    }

    private String createToken(ForumUser user, TokenType tokenType) {
        Map<String, Object> extraClaims = ImmutableMap.<String, Object>builder()
                .put(CLAIM_NAME_ID, user.getId())
                .put(CLAIM_NAME_TOKEN_TYPE, tokenType)
                .build();

        return JwtUtil.createToken(extraClaims, user.getId(), tokenType.expiredHour); // subject = user id
    }

    public boolean isTokenExpired(){
        return this.getExpiration().before(new Date());
    }

    public boolean isTokenValid(ForumUser user) {
        return this.userId.equals(user.getId()) && !isTokenExpired();
    }

    public static class DefaultTokenBuilder {
        private final ForumUser user;
        private final TokenType tokenType;

        public DefaultTokenBuilder(ForumUser user, TokenType tokenType) {
            this.user = user;
            this.tokenType = tokenType;
        }

        public JwtToken build() {
            return new JwtToken(this);
        }
    }

    public static class ParseFromTokenBuilder {
        private final String token;

        public ParseFromTokenBuilder(String token) {
            this.token = token;
        }

        public JwtToken build() {
            return new JwtToken(this);
        }
    }

}