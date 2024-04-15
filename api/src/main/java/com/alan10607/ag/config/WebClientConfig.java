package com.alan10607.ag.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@Slf4j
@EnableRedisRepositories
public class WebClientConfig {

    @Bean
    public WebClient imgurUploadClient(@Value("${imgur.client.uploadUrl}") String uploadUrl){
        return WebClient.builder().baseUrl(uploadUrl).build();
    }

    @Bean
    public WebClient imgurRefreshTokenClient(@Value("${imgur.client.accessTokenUrl}") String accessTokenUrl){
        return WebClient.builder().baseUrl(accessTokenUrl).build();
    }
}