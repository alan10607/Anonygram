package com.alan10607.ag.service.redis.base;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HashBaseRedisService extends BaseRedisService {

    public Map<String, Object> get(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    public void set(String key, Map<String, Object> value) {
        redisTemplate.opsForHash().putAll(key, value);
    }

    public void increment(String key, String hashKey, long addNum){
        redisTemplate.opsForHash().increment(key, hashKey, addNum);
    }
}
