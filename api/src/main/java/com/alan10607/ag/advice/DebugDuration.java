package com.alan10607.ag.advice;

import java.lang.annotation.*;

@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DebugDuration {
    boolean alwaysPrint() default false;
}