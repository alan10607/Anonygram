package com.alan10607.ag.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "imgur.client")
@Data
public class ImgurConfig {
    private String clientId;
    private String clientSecret;
    private String authorizeUrl;
    private String accessTokenUrl;
    private String uploadUrl;
    private String albumId;
    private String accessToken;
    private String refreshToken;
}