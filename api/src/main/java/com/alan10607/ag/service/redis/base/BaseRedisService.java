package com.alan10607.ag.service.redis.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class BaseRedisService {
    @Autowired
    public RedisTemplate redisTemplate;

    public void delete(String key) {
        redisTemplate.delete(key);
    }

    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }

    public void expire(String key, long sec) {
        long randomTime = ((int) (Math.random() * 60)) + sec;//Cache Avalanche, set random expiration times
        redisTemplate.expire(key, randomTime, TimeUnit.SECONDS);
    }

    public <T, K> Long execute(RedisScript<T> script, List<K> keys, Object... args) {
        return (Long) redisTemplate.execute(script, keys, args);
    }

    public void rename(String fromKeyName, String toKeyName){
        redisTemplate.rename(fromKeyName, toKeyName);
    }

}