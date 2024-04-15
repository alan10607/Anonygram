package com.alan10607.ag.exception;

import com.alan10607.ag.exception.base.AnonygramRuntimeException;

public class LockInterruptedRuntimeException extends AnonygramRuntimeException {

    public LockInterruptedRuntimeException(String format, Object... args) {
        super(format, args);
    }

}
