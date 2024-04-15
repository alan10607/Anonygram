package com.alan10607.ag.service.redis.lock;

import com.alan10607.ag.exception.LockInterruptedRuntimeException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
@Slf4j
public class LockService {
    private final RedissonClient redissonClient;

    /**
     * The runnable.run() will not start another thread, it will be the same thread as parent.
     * @param key
     * @param runnable
     */
    public void lock(String key, Runnable runnable, long waitMs, long keyExpireMs, long busySleepMs) throws InterruptedException {
        RLock lock = redissonClient.getLock(key);
        try{
            boolean tryLock = lock.tryLock(waitMs, keyExpireMs, TimeUnit.MILLISECONDS);
            if(tryLock){
                log.debug("Lock function, key={}", key);
                runnable.run();
            }else{
                Thread.sleep(busySleepMs);//Cache Breakdown (Hotspot Invalid), reject request if the query exists
                log.info("Function was locked by the key={}, skip this time", key);
                throw new LockInterruptedRuntimeException("Function was locked by the key={}", key);
            }
        } catch (InterruptedException e) {
//            Thread.currentThread().interrupt();
            log.error("Lock function interrupt, key={}", key, e);
            throw e;
        } finally {
            if(lock.isLocked() && lock.isHeldByCurrentThread()){
                lock.unlock();//Unlock only if key is locked and belongs to the current thread
                log.debug("Unlock function, key={}", key);
            }
        }
    }
}
