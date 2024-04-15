package com.ag.domain.advice;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

@Aspect
@Component
@AllArgsConstructor
@Slf4j
public class DebugDurationAdvice {
    @Pointcut("@annotation(debugDuration)")
    public void debugDurationPointcut(DebugDuration debugDuration) {
    }

    @Around("debugDurationPointcut(debugDuration)")
    public Object measureTime(ProceedingJoinPoint pjp, DebugDuration debugDuration) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return pjp.proceed();
        } finally {
            long end = System.currentTimeMillis();
            long duration = end - start;
            if (debugDuration.alwaysPrint() || duration > 1000) {
                log.info("Debug {} duration: {}ms", getFullFunctionName(pjp), duration);
            } else {
                log.debug("Debug {} duration: {}ms", getFullFunctionName(pjp), duration);
            }
        }
    }

    public static String getFullFunctionName(ProceedingJoinPoint pjp) {
        String packageName = pjp.getSignature().getDeclaringTypeName();
        String methodName = pjp.getSignature().getName();
        String argNames = Arrays.stream(pjp.getArgs()).map(Object::getClass)
                .map(Class::getSimpleName)
                .collect(Collectors.joining(","));
        return String.format("%s().%s(%s)", packageName, methodName, argNames);
    }

}