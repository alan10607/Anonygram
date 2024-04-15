package com.alan10607.ag.schedule;

import com.alan10607.ag.dto.LikeDTO;
import com.alan10607.ag.exception.LockInterruptedRuntimeException;
import com.alan10607.ag.service.forum.LikeService;
import com.alan10607.ag.service.redis.lock.SystemLockService;
import com.alan10607.ag.service.redis.queue.SaveLikeMessageSubscriber;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service
@AllArgsConstructor
@Slf4j
public class SaveLikeSchedule extends QuartzJobBean {
    private final LikeService likeService;
    private final SystemLockService systemLockService;
    private final SaveLikeMessageSubscriber saveLikeMessageSubscriber;
    private static Queue<LikeDTO> updateQueue = new LinkedList<>();
    private static final int MAX_UPDATE_SIZE = 100000;

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        try {
            startBatch();
        } catch (LockInterruptedRuntimeException e) {
            log.error("Save like batch is interrupted because wait for last batch to complete");
        } catch (InterruptedException e) {
            throw new JobExecutionException("Save like lock thread interrupt", e);
        }catch (Exception e) {
            throw new JobExecutionException(e);
        }
    }

    public void startBatch() throws InterruptedException {
        systemLockService.lockBySaveLikeBatch(() -> prepareUpdateQueue());
    }

    private void prepareUpdateQueue(){
        fetchUpdateQueue();
        if(updateQueue.isEmpty()){
            return;
        }

        log.info("Start batch process for saving like to DB, updateQueue size={}", updateQueue.size());
        likeService.saveLikeToDB(updateQueue);
        clearUpdateQueue();
        log.info("End batch process for saving like to DB, updateQueue size={}", updateQueue.size());
    }

    private void fetchUpdateQueue(){
        Queue<LikeDTO> messageQueue = saveLikeMessageSubscriber.getMessageQueue();
        while (!messageQueue.isEmpty() && updateQueue.size() < MAX_UPDATE_SIZE) {
            updateQueue.offer(messageQueue.poll());
        }
    }

    private void clearUpdateQueue(){
        updateQueue.clear();
    }

}