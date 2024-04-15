package com.alan10607.ag.service.redis.queue;

import com.alan10607.ag.dto.LikeDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class SaveLikeMessagePublisher implements MessagePublisher {
    private final RedisTemplate redisTemplate;
    private final PatternTopic saveLikeTopic;

    public void publish(String message) {
        redisTemplate.convertAndSend(saveLikeTopic.getTopic(), message);
    }
}