package com.ag.domain.service;

import com.ag.domain.exception.base.AnonygramRuntimeException;
import com.ag.domain.model.ImgurConfig;
import com.ag.domain.model.base.ConfigEntity;
import com.ag.domain.util.AuthUtil;
import com.ag.domain.util.TimeUtil;
import com.ag.domain.util.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.Optional;
import java.util.function.Consumer;

@Service
@AllArgsConstructor
@Slf4j
public class ImgurService {
    private final ConfigService<ImgurConfig> configService;

    public String upload(String imageBase64) {
        ImgurConfig imgurConfig = configService.get(ConfigEntity.Type.IMGUR);
        ValidationUtil.assertTrue(imgurConfig.isAllConfigNotBlank(), "Imgur config not found, please try to authenticate");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("title", String.format("user=%s, time=%s", AuthUtil.getUserId(), TimeUtil.nowString()));
        body.add("image", imageBase64);
        body.add("description", "User upload");
        body.add("type", "base64");
        body.add("album", imgurConfig.getAlbumId());

        Map<String, Object> response = httpRequest(imgurConfig.getUploadUrl(),
                HttpMethod.POST,
                MediaType.MULTIPART_FORM_DATA,
                headers -> headers.setBearerAuth(imgurConfig.getAccessToken()),
                body);

        return Optional.ofNullable((Map<String, Object>) response.get("data"))
                .map(data -> (String) data.get("link"))
                .orElseThrow(() -> new AnonygramRuntimeException("Image url not found in response payload"));
    }

    public String getAuthorizationUrl() {
        ImgurConfig imgurConfig = configService.get(ConfigEntity.Type.IMGUR);
        ValidationUtil.assertTrue(imgurConfig.isDefaultConfigNotBlank(), "Imgur config not found, please try to authenticate");
        return imgurConfig.getAuthorizeUrl() + "?client_id=" + imgurConfig.getClientId() + "&response_type=token";
    }

    public Map<String, String> saveToken(String accessToken, String refreshToken) {
        ValidationUtil.assertTrue(StringUtils.isNotBlank(accessToken), "Imgur access token is blank when saving");
        ValidationUtil.assertTrue(StringUtils.isNotBlank(refreshToken), "Imgur refresh token is blank when saving");

        ImgurConfig imgurConfig = new ImgurConfig();
        imgurConfig.setAccessToken(accessToken);
        imgurConfig.setRefreshToken(refreshToken);
        configService.patch(imgurConfig);
        log.info("Save access and refresh token to DB succeeded");
        return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
    }

    public Map<String, String> refreshToken() {
        ImgurConfig imgurConfig = configService.get(ConfigEntity.Type.IMGUR);
        ValidationUtil.assertTrue(imgurConfig.isAllConfigNotBlank(), "Imgur config not found, please try to authenticate");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("refresh_token", imgurConfig.getRefreshToken());
        body.add("client_id", imgurConfig.getClientId());
        body.add("client_secret", imgurConfig.getClientSecret());
        body.add("grant_type", "refresh_token");

        Map<String, Object> response = httpRequest(imgurConfig.getTokenUrl(),
                HttpMethod.POST,
                MediaType.APPLICATION_FORM_URLENCODED,
                headers -> {
                },
                body);

        return saveToken((String) response.get("access_token"), (String) response.get("refresh_token"));
    }

    private Map<String, Object> httpRequest(String requestUrl,
                                           HttpMethod method,
                                           MediaType contentType,
                                           Consumer<HttpHeaders> headersConsumer,
                                           MultiValueMap<String, String> body) {
        WebClient client = WebClient.builder().baseUrl(requestUrl).build();
        return client.method(method)
                .contentType(contentType)

                .headers(headersConsumer)
                .body(BodyInserters.fromFormData(body))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .block();
    }

}