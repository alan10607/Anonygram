package com.ag.domain.util;

import com.ag.domain.exception.LockNotGotException;
import com.google.common.util.concurrent.Striped;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.function.Supplier;

@Service
@AllArgsConstructor
@Slf4j
public class LockUtil {
    private static final Striped<Lock> stripedLocks = Striped.lock(10000);
    public static final long WAIT_TRY_LOCK_MS = 3000;
    public static final long BUSY_SLEEP_MS = 500;

    /**
     * The runnable.run() will not start another thread, it will be the same thread as parent.
     *
     * @param key      Lock by this string
     * @param supplier Supplier function that locked
     * @return Supplier result
     */
    public static <T> T lock(String key, Supplier<T> supplier) throws InterruptedException {
        Lock lock = stripedLocks.get(key);
        try {
            if (lock.tryLock(WAIT_TRY_LOCK_MS, TimeUnit.MILLISECONDS)) {
                try {
                    log.debug("Lock function with key={}", key);
                    return supplier.get();
                } finally {
                    lock.unlock();
                    log.debug("Unlock function with key={}", key);
                }
            } else {
                Thread.sleep(BUSY_SLEEP_MS); // Cache Breakdown (Hotspot Invalid), reject request if the query exists
                log.info("Function was locked by the key={}, skip this time", key);
                throw new LockNotGotException("Function was locked by the key={}", key);
            }
        } catch (InterruptedException e) {
            log.error("Lock interrupt with exception, key={}", key, e);
            throw e;
        }
    }
}
