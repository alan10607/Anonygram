package com.ag.domain.util;

import com.ag.domain.exception.LockNotGotException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Supplier;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
@Slf4j
class LockUtilTest {
    private final String key = "test_key";
    private final int expiredMs = (int) LockUtil.WAIT_TRY_LOCK_MS;

    @Test
    public void testLock_10threads_each_10ms() throws InterruptedException {
        executeMultiService(10, 10);
    }

    @Test
    public void testLock_10threads_each_1000ms() throws InterruptedException {
        executeMultiService(10, 1000);
    }

    @Test
    public void testLock_100threads_each_1000ms() throws InterruptedException {
        executeMultiService(100, 1000);
    }

    @Test
    public void testLock_500threads_each_10ms() throws InterruptedException {
        executeMultiService(500, 10);
    }

    private void executeMultiService(int threadNumber, int runtimeMs) throws InterruptedException {
        // Arrange
        AtomicInteger finishCount = new AtomicInteger();
        Supplier<AtomicInteger> supplier = createSupplier(finishCount, runtimeMs);

        // Create a fixed-size thread pool to simulate concurrent access
        ExecutorService executorService = Executors.newFixedThreadPool(threadNumber);

        // Use CountDownLatch to wait for all threads to finish
        CountDownLatch latch = new CountDownLatch(threadNumber);

        // Act
        startThreads(threadNumber, key, executorService, supplier, latch);

        // Assert
        assertTrue(executorService.isTerminated());
        assertEquals(0, latch.getCount());
        int expect = calculateFinishThreads(threadNumber, runtimeMs, expiredMs);
        log.warn("Threads number={}, finished={}, expect={}", threadNumber, finishCount, expect);
        assertTrue(finishCount.intValue() <= expect,
                String.format("Finished(%s) should <= expect(%s)", finishCount, expect));
    }

    private int calculateFinishThreads(int threadNumber, int runtimeMs, int expiredMs) {
        int capability = expiredMs / runtimeMs;
        return Math.min(threadNumber, capability);
    }

    private Supplier<AtomicInteger> createSupplier(AtomicInteger finishCount, long runtimeMs) {
        return () -> {
            try {
                Thread.sleep(runtimeMs);
                int before = finishCount.intValue();
                int after = finishCount.incrementAndGet();
                if (before + 1 != after) {
                    throw new RuntimeException("Thread not safe");
                }
                log.debug("===> Finish count=" + finishCount);
                return finishCount;
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
    }

    private <T> void startThreads(int numThreads, String key, ExecutorService executorService, Supplier<T> supplier, CountDownLatch latch) throws InterruptedException {
        StringBuffer errorMessages = new StringBuffer();
        try {
            for (int i = 0; i < numThreads; i++) {
                executorService.submit(() -> {
                    try {
                        LockUtil.lock(key, supplier);
                    } catch (LockNotGotException e) {
                        log.debug("Lock not got");
                    } catch (Exception e) {
                        errorMessages.append(Thread.currentThread() + "=>" + e.getMessage() + "\n");
                    } finally {
                        latch.countDown();
                    }
                });
            }
        } finally {
            waitAndShutdownThreads(latch, executorService);

            if (errorMessages.length() > 0) {
                throw new RuntimeException("Threads throw exceptions:\n" + errorMessages);
            }
        }
    }

    private void waitAndShutdownThreads(CountDownLatch latch, ExecutorService executorService) throws InterruptedException {
        // Wait for all threads to finish execution
        latch.await();
        log.info("Latch count: " + latch.getCount());

        shutdownThreadPool(executorService);
    }

    private void shutdownThreadPool(ExecutorService executorService) {
        executorService.shutdown();
        try {
            if (!executorService.awaitTermination(800, TimeUnit.MILLISECONDS)) {
                executorService.shutdownNow();
            }
        } catch (InterruptedException e) {
            log.error("executorService InterruptedException", e);
            executorService.shutdownNow();
        }
    }
}

