package com.alan10607.ag.config;

import com.alan10607.ag.service.redis.queue.SaveLikeMessageSubscriber;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@Configuration
@ConfigurationProperties(prefix = "spring.redis")
@Data
@Slf4j
public class RedisQueueConfig {

    @Bean
    public PatternTopic saveLikeTopic() {
        return new PatternTopic("save-like");
    }

    @Bean
    public MessageListenerAdapter saveLikeListenerAdapter() {//to handle JMS
        return new MessageListenerAdapter(new SaveLikeMessageSubscriber());
    }

    /**
     * Mapping topic and MessageListener
     * @param factory
     * @return
     */
    @Bean
    public RedisMessageListenerContainer redisMessageContainer(LettuceConnectionFactory factory) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(factory);
        container.addMessageListener(saveLikeListenerAdapter(), saveLikeTopic());//add more topic here
        return container;
    }

}