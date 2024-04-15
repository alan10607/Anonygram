package com.ag.domain.advice;

import com.ag.domain.exception.LockNotGotException;
import com.ag.domain.model.Article;
import com.ag.domain.model.ForumUser;
import com.ag.domain.model.Like;
import com.ag.domain.model.base.ConfigEntity;
import com.ag.domain.util.AuthUtil;
import com.google.common.util.concurrent.Striped;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;

@Aspect
@Component
@AllArgsConstructor
@Slf4j
public class ConcurrentSafetyAdvice {
    private static final Striped<Lock> stripedLocks = Striped.lock(10000);
    private static final long WAIT_TRY_LOCK_MS = 3000;
    private static final long BUSY_SLEEP_MS = 500;
    private static final String NOT_LOCK_KEY = "";

    @Pointcut("@annotation(concurrentSafety)")
    public void concurrentSafetyPointcut(ConcurrentSafety concurrentSafety) {
    }

    @Around("concurrentSafetyPointcut(concurrentSafety)")
    public Object execute(ProceedingJoinPoint pjp, ConcurrentSafety concurrentSafety) throws Throwable {
        String key = getKey(concurrentSafety.entity(), pjp.getArgs());
        if (key.equals(NOT_LOCK_KEY)) {
            return pjp.proceed();
        } else {
            return executeWithLock(key, pjp);
        }
    }

    private Object executeWithLock(String key, ProceedingJoinPoint pjp) throws Throwable {
        Lock lock = stripedLocks.get(key);
        try {
            if (lock.tryLock(WAIT_TRY_LOCK_MS, TimeUnit.MILLISECONDS)) {
                try {
                    log.debug("Lock function with key={}", key);
                    return pjp.proceed();
                } finally {
                    lock.unlock();
                    log.debug("Unlock function with key={}", key);
                }
            } else {
                Thread.sleep(BUSY_SLEEP_MS);// Cache Breakdown (Hotspot Invalid), reject request if the query exists
                log.info("Function was locked by the key={}, skip this time", key);
                throw new LockNotGotException("Resource is temporarily locked");
            }
        } catch (InterruptedException e) {
            log.error("Lock interrupt with exception, key={}", key);
            throw e;
        }
    }

    private String getKey(Class<?> entityClass, Object[] args) {
        if (entityClass.equals(Void.class)) { // Used within CrudService's create, update, or delete methods.
            Object entity = args[0];
            EntityType entityType = EntityType.of(entity);
            return entityType.getKeyByEntity(entity);
        } else { // Used in a custom method where the entity type needs to be assigned.
            EntityType entityType = EntityType.of(entityClass);
            return entityType.getKeyByArgs(args);
        }
    }

    @AllArgsConstructor
    public enum EntityType {
        ARTICLE(Article.class) {
            @Override
            public String getKeyByEntity(Object entity) {
                Article article = (Article) entity;
                if (article.getArticleId() == null) {
                    return NOT_LOCK_KEY;
                } else if (article.getNo() == null) {
                    return String.format("%s_%s", this.getClazz().getName(), article.getArticleId());
                } else {
                    return String.format("%s_%s", this.getClazz().getName(), article.getId());
                }
            }

            @Override
            public String getKeyByArgs(Object... args) {
                validateArguments(args, String.class, Integer.class);
                return getKeyByEntity(new Article((String) args[0], (Integer) args[1]));
            }
        },
        LIKE(Like.class) {
            @Override
            public String getKeyByEntity(Object entity) {
                Like like = (Like) entity;
                like.setUserId(AuthUtil.getUserId());
                return String.format("%s_%s", this.getClazz().getName(), like.getId());
            }

            @Override
            public String getKeyByArgs(Object... args) {
                validateArguments(args, String.class, Integer.class);
                return getKeyByEntity(new Like((String) args[0], (Integer) args[1]));
            }
        },
        USER(ForumUser.class) {
            @Override
            public String getKeyByEntity(Object entity) {
                ForumUser user = (ForumUser) entity;
                return String.format("%s_%s", this.getClazz().getName(), user.getId());
            }

            @Override
            public String getKeyByArgs(Object... args) {
                validateArguments(args, String.class);
                return getKeyByEntity(new ForumUser((String) args[0]));
            }
        },
        CONFIG(ConfigEntity.class) {
            @Override
            public String getKeyByEntity(Object entity) {
                ConfigEntity configEntity = (ConfigEntity) entity;
                return String.format("%s_%s", this.getClazz().getName(), configEntity.getId());
            }

            @Override
            public String getKeyByArgs(Object... args) {
                validateArguments(args, ConfigEntity.Type.class);
                return getKeyByEntity(((ConfigEntity.Type) args[0]).id);
            }
        };

        private final Class<?> clazz;

        public Class<?> getClazz() {
            return clazz;
        }

        public abstract String getKeyByEntity(Object entity);

        public abstract String getKeyByArgs(Object... args);

        public static EntityType of(Object entity) {
            return of(entity.getClass());
        }

        public static EntityType of(Class<?> entityClass) {
            for (EntityType entityType : values()) {
                if (entityType.clazz.equals(entityClass)) {
                    return entityType;
                }
            }
            throw new IllegalArgumentException("Lock function with unsupported entity type: " + entityClass.getName());
        }

        private static void validateArguments(Object[] args, Class<?>... classes) {
            if (args.length != classes.length) {
                throw new IllegalArgumentException("Lock function with mismatched argument length");
            }

            for (int i = 0; i < args.length; ++i) {
                if (!classes[i].isInstance(args[i])) {
                    throw new IllegalArgumentException("Lock function with mismatched argument type");
                }
            }
        }
    }

}