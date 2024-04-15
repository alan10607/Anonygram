package com.alan10607.ag.service.redis;

import com.alan10607.ag.service.redis.base.ZSetBaseRedisService;
import com.alan10607.ag.util.TimeUtil;
import com.alan10607.ag.constant.RedisKey;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.DefaultTypedTuple;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class IdRedisService {
    private final ZSetBaseRedisService zSetBaseRedisService;
    private static final String KEY = RedisKey.ID;
    private static final int MAX_ID_SIZE = 100;
    private static final long SCORE_BASE = 4102416000000L;//= LocalDateTime.of(2100, 1, 1, 0, 0).atZone(UTC_PLUS_8).toInstant().toEpochMilli();

    public List<String> get() {
        return zSetBaseRedisService.get(KEY, 0, MAX_ID_SIZE - 1);
    }

    public void set(String id){
        set(Collections.singletonList(id));
    }

    public void set(List<String> sortedIdList) {
        if(sortedIdList.isEmpty()) return;

        long scoreBase = getNowTimeScore();
        Set<ZSetOperations.TypedTuple<String>> tuples = new HashSet<>();
        for(int i = 0; i < sortedIdList.size(); i++){
            tuples.add(new DefaultTypedTuple<>(
                    sortedIdList.get(i), (double) (scoreBase + i)));
        }
        zSetBaseRedisService.set(KEY, tuples);
    }

    /**
     * Reverse localDateTime for redis score, reduce time complexity from O(log n) to O(1) when zadd
     * time:   1970---------2022----------------------------2100
     * score:  SCORE_BASE---BATCH_START---------------------0
     *
     * @return score
     */
    private long getNowTimeScore(){
        long epochMilli = TimeUtil.now().atZone(TimeUtil.UTC_PLUS_8).toInstant().toEpochMilli();
        return SCORE_BASE - epochMilli;
    }
}
