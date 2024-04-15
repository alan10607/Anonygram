package com.ag.domain.advice;

import java.lang.annotation.*;

@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DebugDuration {
    boolean alwaysPrint() default false;
}