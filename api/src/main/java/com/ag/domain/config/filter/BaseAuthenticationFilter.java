package com.ag.domain.config.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public abstract class BaseAuthenticationFilter<T extends AbstractAuthenticationToken> extends OncePerRequestFilter {
    protected abstract T extractAuthentication(HttpServletRequest request, HttpServletResponse response);

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        try {
            setAuthentication(request, response);
        } catch (Exception e) {
            log.info("Authentication filter error", e);
        }

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(HttpServletRequest request, HttpServletResponse response) {
        if (isAlreadyHaveAuthentication()) return;

        AbstractAuthenticationToken token = extractAuthentication(request, response);
        if (token == null) return;

        SecurityContextHolder.getContext().setAuthentication(token);
    }

    private boolean isAlreadyHaveAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication() != null;
    }

}