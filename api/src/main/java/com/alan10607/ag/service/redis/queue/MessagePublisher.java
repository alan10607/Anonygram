package com.alan10607.ag.service.redis.queue;

public interface MessagePublisher {
    void publish(String message);
}