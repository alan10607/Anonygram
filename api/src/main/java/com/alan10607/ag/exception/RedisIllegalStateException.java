package com.alan10607.ag.exception;

import com.alan10607.ag.exception.base.AnonygramRuntimeException;

public class RedisIllegalStateException extends AnonygramRuntimeException {

    public RedisIllegalStateException(String format, Object... args) {
        super(format, args);
    }

}
