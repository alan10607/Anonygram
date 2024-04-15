package com.alan10607.ag.service.redis.base;

import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class SetBaseRedisService extends BaseRedisService {

    public Set<String> get(String key) {
        return redisTemplate.opsForSet().members(key);
    }

    public void set(String key, String... value) {
        redisTemplate.opsForSet().add(key, value);
    }
}
