package com.alan10607.ag.service.redis.lock;

import com.alan10607.ag.exception.LockInterruptedRuntimeException;
import com.alan10607.ag.constant.RedisKey;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class ForumLockService {
    private final LockService lockService;
    private static final long WAIT_MS = 100;
    private static final long KEY_EXPIRE_MS = 3000;
    private static final long BUSY_SLEEP_MS = 1000;

    private String getArticleLockName(String id){
        return String.format(RedisKey.LOCK_ARTICLE, id);
    }

    private String getContentLockName(String id, int no){
        return String.format(RedisKey.LOCK_CONTENT, id, no);
    }

    private String getUserLockName(String userId){
        return String.format(RedisKey.LOCK_USER, userId);
    }

    private void lock(String key, Runnable runnable){
        try {
            lockService.lock(key, runnable, WAIT_MS, KEY_EXPIRE_MS, BUSY_SLEEP_MS);
        } catch (LockInterruptedRuntimeException e) {
            throw new LockInterruptedRuntimeException("System busy for too many requests, please try again later");
        } catch (InterruptedException e) {
            throw new LockInterruptedRuntimeException("Request failed because thread interrupt, please try again later");
        }
    }

    public void lockByArticle(String id, Runnable runnable) {
        lock(getArticleLockName(id), runnable);
    }

    public void lockByContent(String id, int no, Runnable runnable) {
        lock(getContentLockName(id, no), runnable);
    }

    public void lockByUser(String userId, Runnable runnable) {
        lock(getUserLockName(userId), runnable);
    }

}
