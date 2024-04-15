package com.alan10607.ag.service.request;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class ImgurRequestService {
    private final WebClient imgurUploadClient;
    private final WebClient imgurRefreshTokenClient;

    public Map<String, Object> postUpload(String token, Map<String, Object> body){
        return imgurUploadClient.post()
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .headers(h -> h.setBearerAuth(token))
                .body(BodyInserters.fromMultipartData(toMultiValueMap(body)))
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    public Map<String, Object> postRefreshToken(Map<String, String> body){
        return imgurRefreshTokenClient.post()
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData(toMultiValueMap(body)))
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }

    private <T> MultiValueMap<String, T> toMultiValueMap(Map<String, T> map){
        MultiValueMap multiValueMap = new LinkedMultiValueMap();
        multiValueMap.setAll(map);
        return multiValueMap;
    }

}