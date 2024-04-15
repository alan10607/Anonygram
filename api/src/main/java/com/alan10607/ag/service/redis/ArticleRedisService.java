package com.alan10607.ag.service.redis;

import com.alan10607.ag.service.redis.base.HashBaseRedisService;
import com.alan10607.ag.constant.RedisKey;
import com.alan10607.ag.dto.ArticleDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class ArticleRedisService {
    private final HashBaseRedisService hashBaseRedisService;
    private static final int ARTICLE_EXPIRE_SEC = 3600;

    private String getKey(String id){
        return String.format(RedisKey.ARTICLE, id);
    }

    public ArticleDTO get(String id) {
        Map<String, Object> dataMap = hashBaseRedisService.get(getKey(id));
        return ArticleDTO.from(dataMap);
    }

    public void set(ArticleDTO articleDTO) {
        Map<String, Object> dataMap = articleDTO.to(Map.class);
        hashBaseRedisService.set(getKey(articleDTO.getId()), dataMap);
    }

    public void delete(String id){
        hashBaseRedisService.delete(getKey(id));
    }

    public void expire(String id) {
        hashBaseRedisService.expire(getKey(id), ARTICLE_EXPIRE_SEC);
    }

}
