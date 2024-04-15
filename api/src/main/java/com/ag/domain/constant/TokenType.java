package com.ag.domain.constant;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;

@AllArgsConstructor
public enum TokenType {
    ACCESS_TOKEN(1, HttpHeaders.AUTHORIZATION),
    REFRESH_TOKEN(24 * 30, "Refresh-Token");

    public final long expiredHour;
    public final String header;
}