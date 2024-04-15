package com.alan10607.ag.service.redis.queue;

import com.alan10607.ag.dto.LikeDTO;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service
@NoArgsConstructor
@Slf4j
public class SaveLikeMessageSubscriber implements MessageListener {
    private static Queue<LikeDTO> messageQueue = new LinkedList<>();

    public void onMessage(Message message, byte[] pattern) {
        LikeDTO likeDTO = LikeDTO.fromMessageString(message.toString());
        messageQueue.offer(likeDTO);
        log.info("Listened message {}, save like messageQueue size={}", message, messageQueue.size());
    }

    public Queue<LikeDTO> getMessageQueue(){
        return this.messageQueue;
    }

}