package com.ag.domain.service;

import com.ag.domain.config.filter.JwtFilter;
import com.ag.domain.constant.TokenType;
import com.ag.domain.dto.TokenDTO;
import com.ag.domain.exception.base.AnonygramRuntimeException;
import com.ag.domain.model.ForumUser;
import com.ag.domain.model.JwtToken;
import com.ag.domain.util.AuthUtil;
import com.ag.domain.util.CookieUtil;
import com.ag.domain.util.ValidationUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class TokenService {
    private final JwtFilter jwtFilter;
    private final AuthenticationManager authenticationManager;

    public TokenDTO test() {
        try {
            TokenDTO result = new TokenDTO();
            result.setId(AuthUtil.getUserId());
            return result;
        } catch (AnonygramRuntimeException e) {
            return new TokenDTO();
        }
    }

    public TokenDTO createToken(TokenDTO tokenDTO, HttpServletResponse response) {
        validateEmail(tokenDTO);
        validatePassword(tokenDTO);

        ForumUser user = getAuthenticatedUser(tokenDTO.getEmail(), tokenDTO.getPassword());
        JwtToken accessToken = new JwtToken.DefaultTokenBuilder(user, TokenType.ACCESS_TOKEN).build();
        JwtToken refreshToken = new JwtToken.DefaultTokenBuilder(user, TokenType.REFRESH_TOKEN).build();
        if (BooleanUtils.isTrue(tokenDTO.getSetCookie())) {
            setTokenToCookie(response, accessToken);
        }
        return new TokenDTO(accessToken.getValue(), refreshToken.getValue());
    }

    public TokenDTO refreshToken(TokenDTO tokenDTO) {
        JwtToken refreshToken = new JwtToken.ParseFromTokenBuilder(tokenDTO.getRefreshToken()).build();
        jwtFilter.validateRefreshToken(refreshToken);

        ForumUser user = jwtFilter.getUserFromToken(refreshToken);
        JwtToken newAccessToken = new JwtToken.DefaultTokenBuilder(user, TokenType.ACCESS_TOKEN).build();
        JwtToken newRefreshToken = new JwtToken.DefaultTokenBuilder(user, TokenType.REFRESH_TOKEN).build();
        log.info("Refresh new JWT token for userId={}", user.getId());
        return new TokenDTO(newAccessToken.getValue(), newRefreshToken.getValue());
    }
    
    private ForumUser getAuthenticatedUser(String email, String password) {
        return (ForumUser) authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, password))
                .getPrincipal();
    }

    private void setTokenToCookie(HttpServletResponse response, JwtToken jwtToken) {
        String header = jwtToken.getTokenType().header;
        long maxAge = (jwtToken.getExpiration().getTime() - jwtToken.getIssuedAt().getTime()) / 1000;
        response.addHeader(HttpHeaders.SET_COOKIE, CookieUtil.createHttpOnlyCookie(header, jwtToken.getValue(), maxAge).toString());
    }

    void validateEmail(TokenDTO tokenDTO) {
        ValidationUtil.assertTrue(StringUtils.isNotBlank(tokenDTO.getEmail()), "Email can't be blank");
    }

    void validatePassword(TokenDTO tokenDTO) {
        ValidationUtil.assertTrue(StringUtils.isNotBlank(tokenDTO.getPassword()), "Password can't be blank");
    }

}