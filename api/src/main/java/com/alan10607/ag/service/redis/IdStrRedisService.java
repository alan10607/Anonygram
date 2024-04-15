package com.alan10607.ag.service.redis;

import com.alan10607.ag.service.redis.base.StringBaseRedisService;
import com.alan10607.ag.constant.RedisKey;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class IdStrRedisService {
    private final StringBaseRedisService stringBaseRedisService;
    private static final String KEY = RedisKey.ID_STR;

    public String get() {
        return stringBaseRedisService.get(KEY);
    }

    public void set(String idStr) {
        stringBaseRedisService.set(KEY, idStr);
    }

    public void delete() {
        stringBaseRedisService.delete(KEY);
    }
}
