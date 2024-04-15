package com.alan10607.ag.service.redis;

import com.alan10607.ag.service.redis.base.HashBaseRedisService;
import com.alan10607.ag.constant.RedisKey;
import com.alan10607.ag.dto.ContentDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class ContentRedisService {
    private final HashBaseRedisService hashBaseRedisService;
    private static final int CONTENT_EXPIRE_SEC = 3600;

    private String getKey(String id, int no) {
        return String.format(RedisKey.CONTENT, id, no);
    }

    public ContentDTO get(String id, int no) {
        Map<String, Object> dataMap = hashBaseRedisService.get(getKey(id, no));
        return ContentDTO.from(dataMap);
    }

    public void set(ContentDTO contentDTO) {
        Map<String, Object> dataMap = contentDTO.to(Map.class);
        hashBaseRedisService.set(getKey(contentDTO.getId(), contentDTO.getNo()), dataMap);
    }

    public void delete(String id, int no){
        hashBaseRedisService.delete(getKey(id, no));
    }

    public void expire(String id, int no) {
        hashBaseRedisService.expire(getKey(id, no), CONTENT_EXPIRE_SEC);
    }

    public void updateLikes(String id, int no, long addNum) {
        hashBaseRedisService.increment(getKey(id, no), "likes", addNum);
    }

}
