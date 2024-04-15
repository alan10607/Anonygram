package com.alan10607.ag.config;

import com.alan10607.ag.model.ForumUser;
import com.alan10607.ag.service.auth.JwtService;
import com.alan10607.ag.service.auth.UserService;
import com.alan10607.ag.util.HttpUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@Data
@Slf4j
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsServices;
    private final UserService userService;
    private static final String BEARER = "Bearer ";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try{
            setAuthentication(request, response);
        }catch (Exception e){
            log.info("JwtFilter error", e);
        }
        filterChain.doFilter(request, response);
    }

    private void setAuthentication(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null) return;//already set authentication

        ForumUser user = getUserFromToken(request, response);
        if(user == null) return;//user not found

        UsernamePasswordAuthenticationToken authToken = createAuthToken(user, request);
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private ForumUser getUserFromToken(HttpServletRequest request, HttpServletResponse response){
        ForumUser user;
        try {
            user = getAccessTokenUser(request);
            if(user != null) return user;
        }catch (Exception e){
            log.debug("Get access token error: {}", e.getMessage());
        }

        try {
            user = getRefreshTokenUserAndResetAccessToken(request, response);
            if(user != null) return user;
        }catch (Exception e){
            log.debug("Get refresh token error: {}", e.getMessage());
        }

        return null;
    }

    private ForumUser getAccessTokenUser(HttpServletRequest request){
        String accessToken = getTokenFromRequest(JwtService.ACCESS_TOKEN, request);
        if(StringUtils.isBlank(accessToken)) return null;
        if(!jwtService.extractIsAccessToken(accessToken)) return null;

        return getUserDetails(accessToken);
    }

    private ForumUser getRefreshTokenUserAndResetAccessToken(HttpServletRequest request, HttpServletResponse response){
        String refreshToken = getTokenFromRequest(JwtService.REFRESH_TOKEN, request);
        if(StringUtils.isBlank(refreshToken)) return null;
        if(!jwtService.extractIsRefreshToken(refreshToken)) return null;

        ForumUser user = getUserDetails(refreshToken);
        if(user == null) return null;//token invalid

        jwtService.setResponseJwtCookie(response, user);
        log.info("Refresh new JWT token for userId={}", user.getId());
        return user;

    }

    private String getTokenFromRequest(String tokenName, HttpServletRequest request) {
        String token = HttpUtil.getFromCookie(request, tokenName);
        if(StringUtils.isNotBlank(token)) {
            return token;
        }

        token = request.getHeader(tokenName);
        if(StringUtils.isNotBlank(token) && token.length() > BEARER.length() && token.startsWith(BEARER)){
            return token.substring(BEARER.length());
        }

        return HttpUtil.getFromParameter(request, tokenName);
    }

    private ForumUser getUserDetails(String token) {
        return isAnonymousToken(token) ?
                getAnonymousUser(token) :
                getLoginUser(token);
    }

    private boolean isAnonymousToken(String token) {
        String email = jwtService.extractEmail(token);
        return StringUtils.isBlank(email);
    }

    private ForumUser getLoginUser(String token) {
        String email = jwtService.extractEmail(token);
        if(email == null) return null;

        ForumUser user = (ForumUser) userDetailsServices.loadUserByUsername(email);
        if(!jwtService.isTokenValid(token, user)) return null;

        return user;
    }

    private ForumUser getAnonymousUser(String token) {
        String anonymousName = jwtService.extractUsername(token);
        if(anonymousName == null) return null;

        if(jwtService.isTokenExpired(token)) return null;

        return userService.getTempAnonymousUser(anonymousName);
    }

    private UsernamePasswordAuthenticationToken createAuthToken(ForumUser user, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails((request)));
        return authToken;
    }
}