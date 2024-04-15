package com.alan10607.ag.service.redis.base;

import org.springframework.stereotype.Service;

@Service
public class StringBaseRedisService extends BaseRedisService {

    public String get(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }
}
