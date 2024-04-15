package com.alan10607.ag.config;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.scripting.support.ResourceScriptSource;

import java.io.IOException;

@Configuration
@ConfigurationProperties(prefix = "spring.redis")
@Data
@Slf4j
public class RedisConfig {
    private String host;
    private String port;
    private String password;

//    @Bean
//    public LettuceConnectionFactory connectionFactory(){
//        RedisStandaloneConfiguration conf = new RedisStandaloneConfiguration();
//        conf.setHostName("localhost");
//        conf.setPort(6379);
//        return new LettuceConnectionFactory(conf);
//    }

    /**
     * Set redis connection instance, Spring Boots uses Lettuce by default
     * @param connectionFactory
     * @return
     */
    @Bean
    public RedisTemplate<String, Long> redisTemplate(LettuceConnectionFactory connectionFactory){
        log.info("RedisTemplate config start, connectionFactory hostName={}, port={}",
                connectionFactory.getHostName(),
                connectionFactory.getPort());

        RedisTemplate<String, Long> template = new RedisTemplate<>();

        //Set the connection factory, LettuceConnectionFactory setting is set in application.yaml
        template.setConnectionFactory(connectionFactory);

        /*
        StringRedisSerializer: general strings
        JdkSerializationRedisSerializer: used by default, the object needs to implement Serializable
        Jackson2JsonRedisSerializer: Store in json format, specify the deserialization class when initializing
        GenericJackson2JsonRedisSerializer: Stored in json format, less efficient, when storing in redis, an additional @class hashmap will be stored as a deserialized class
         */
        //Set the serialization method
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new GenericJackson2JsonRedisSerializer());
        template.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());

        //Enable Transaction, the default is disabled
        //template.setEnableTransactionSupport(true);

        //set these parameters
        template.afterPropertiesSet();

        log.info("RedisTemplate config succeeded");
        return template;
    }

    /**
     * Set and create RedissonClient
     * @return
     * @throws IOException
     */
    @Bean(destroyMethod = "shutdown")//Run RedissonClient.shutdown() method after destroy
    public RedissonClient redisson() throws IOException {
        String address = String.format("redis://%s:%s", host, port);
        log.info("RedissonConfig config address={}", address);
        Config config = new Config();
        config.useSingleServer().setAddress(address).setPassword(password);
        RedissonClient redissonClient = Redisson.create(config);
        log.info("RedissonConfig config succeeded");
        return redissonClient;
    }

    @Bean
    public DefaultRedisScript<Long> setContentLikeScript() {
        return getRedisScript("lua/set_content_like.lua", Long.class);
    }

    @Bean
    public DefaultRedisScript<Long> isMemberMultiScript() {
        return getRedisScript("lua/is_member_multi.lua", Long.class);
    }

    private <T> DefaultRedisScript<T> getRedisScript(String scriptLocation, Class<T> resultType) {
        DefaultRedisScript<T> redisScript = new DefaultRedisScript<>();
        redisScript.setScriptSource(new ResourceScriptSource(new ClassPathResource(scriptLocation)));
        redisScript.setResultType(resultType);
        return redisScript;
    }

}