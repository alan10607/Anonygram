package com.ag.domain.exception;

import com.ag.domain.exception.base.AnonygramRuntimeException;

public class LockNotGotException extends AnonygramRuntimeException {

    public LockNotGotException(String format, Object... args) {
        super(format, args);
    }

}
