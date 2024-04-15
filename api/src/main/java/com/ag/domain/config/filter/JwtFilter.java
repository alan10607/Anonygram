package com.ag.domain.config.filter;

import com.ag.domain.constant.TokenType;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.exception.base.AnonygramRuntimeException;
import com.ag.domain.model.ForumUser;
import com.ag.domain.model.JwtToken;
import com.ag.domain.service.UserService;
import com.ag.domain.util.CookieUtil;
import com.ag.domain.util.ValidationUtil;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.checkerframework.checker.units.qual.A;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import java.util.Optional;

@Configuration
@AllArgsConstructor
@Slf4j
public class JwtFilter extends BaseAuthenticationFilter<UsernamePasswordAuthenticationToken> {
    private final UserService userService;
    private static final String BEARER = "Bearer ";

    @Override
    protected UsernamePasswordAuthenticationToken extractAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String token = getAccessTokenFromRequest(request, TokenType.ACCESS_TOKEN.header);
        if (StringUtils.isBlank(token)) return null;

        JwtToken accessToken = new JwtToken.ParseFromTokenBuilder(token).build();
        if (accessToken == null || !isValidAccessToken(accessToken)) return null;

        ForumUser user = getUserFromToken(accessToken);
        if (user == null) return null;

        return createAuthToken(user, request);
    }

    private String getAccessTokenFromRequest(HttpServletRequest request, String tokenName) {
        return Optional.ofNullable((request.getHeader(tokenName)))
                .filter(jwt -> StringUtils.isNotBlank(jwt) && jwt.length() > BEARER.length() && jwt.startsWith(BEARER))
                .map(jwt -> jwt.substring(BEARER.length()))
                .orElse(CookieUtil.getCookieValue(request, tokenName));
    }

    private UsernamePasswordAuthenticationToken createAuthToken(ForumUser user, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails((request)));
        return authToken;
    }

    public ForumUser getUserFromToken(JwtToken jwtToken) {
        ForumUser user = userService.get(jwtToken.getUserId());
        if (user == null || !jwtToken.isTokenValid(user)) {
            log.warn("Invalid token={} for user={}", jwtToken.getValue(), jwtToken.getUserId());
            throw new AnonygramRuntimeException("Invalid token when try to get user");
        }
        return user;
    }

    private boolean isValidAccessToken(JwtToken accessToken) {
        try {
            validateAccessToken(accessToken);
            return true;
        } catch (AgValidationException e) {
            log.debug("Validate AccessToken failed: {}", e.getMessage());
            return false;
        }
    }

    void validateAccessToken(JwtToken jwtToken) {
        ValidationUtil.assertTrue(jwtToken.getTokenType() == TokenType.ACCESS_TOKEN, "Not a accessToken");
        ValidationUtil.assertTrue(!jwtToken.isTokenExpired(), "AccessToken is expired ");
    }

    public void validateRefreshToken(JwtToken jwtToken) {
        ValidationUtil.assertTrue(jwtToken.getTokenType() == TokenType.REFRESH_TOKEN, "Not a refreshToken");
        ValidationUtil.assertTrue(!jwtToken.isTokenExpired(), "RefreshToken is expired ");
    }

}