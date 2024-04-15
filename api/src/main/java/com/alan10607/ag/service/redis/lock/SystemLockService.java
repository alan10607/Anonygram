package com.alan10607.ag.service.redis.lock;

import com.alan10607.ag.constant.RedisKey;
import com.alan10607.ag.exception.LockInterruptedRuntimeException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class SystemLockService {
    private final LockService lockService;

    public void lockBySaveLikeBatch(Runnable runnable) throws InterruptedException {
        lockService.lock(RedisKey.LOCK_SAVE_LIKE_BATCH, runnable, 0, 10 * 60 * 1000, 0);
    }


}
