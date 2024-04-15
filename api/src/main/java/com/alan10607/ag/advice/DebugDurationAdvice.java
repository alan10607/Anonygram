package com.alan10607.ag.advice;

import com.alan10607.ag.util.ToolUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
@AllArgsConstructor
@Slf4j
public class DebugDurationAdvice {

    @Around("execution(* com.alan10607.ag.service.redis.*.*(..)) " +
            "|| @annotation(com.alan10607.ag.advice.DebugDuration)")
    public Object measureTime(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return pjp.proceed();
        } finally {
            long end = System.currentTimeMillis();
            long duration = end - start;
            if(duration > 1000){
                log.info("Debug {} duration: {}ms", ToolUtil.getFullFunctionName(pjp), duration);
            }else{
                log.debug("Debug {} duration: {}ms", ToolUtil.getFullFunctionName(pjp), duration);
            }
        }
    }

}