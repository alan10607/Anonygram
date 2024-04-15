package com.ag.domain.config;

import com.ag.domain.model.ImgurConfig;
import com.ag.domain.model.base.ConfigEntity;
import com.ag.domain.service.ConfigService;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
@Data
@ConfigurationProperties(prefix = "imgur")
public class ImgurDefaultConfig {
    private String authorizeUrl;
    private String tokenUrl;
    private String uploadUrl;
    private String clientId;
    private String clientSecret;
    private String albumId;

    private final ConfigService<ImgurConfig> configService;

    @PostConstruct
    public void init() {
        if (configService.get(ConfigEntity.Type.IMGUR) == null) {
            ImgurConfig imgurConfig = ImgurConfig.builder()
                    .authorizeUrl(this.authorizeUrl)
                    .tokenUrl(this.tokenUrl)
                    .uploadUrl(this.uploadUrl)
                    .clientId(this.clientId)
                    .clientSecret(this.clientSecret)
                    .albumId(this.albumId)
                    .build();
            configService.patch(imgurConfig);
            log.info("Initializing Imgur client configuration done");
        } else {
            log.info("Existing Imgur client configuration found");
        }
    }
}