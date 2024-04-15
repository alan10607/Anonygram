package com.alan10607.ag.service.redis.base;

import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ZSetBaseRedisService extends BaseRedisService {

    public List<String> get(String key, int start, int end) {
        Set<String> zSet = redisTemplate.opsForZSet().range(key, start, end);
        return zSet.stream().collect(Collectors.toList());
    }

    public void set(String key, Set<ZSetOperations.TypedTuple<String>> tuples) {
        redisTemplate.opsForZSet().add(key, tuples);
    }

    public void set(String key, String value, double score) {
        redisTemplate.opsForZSet().add(key, value, score);
    }


}
