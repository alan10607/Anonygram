package com.alan10607.ag.exception;

import com.alan10607.ag.exception.base.AnonygramRuntimeException;

public class AnonygramIllegalStateException extends AnonygramRuntimeException {

    public AnonygramIllegalStateException(String format, Object... args) {
        super(format, args);
    }

}
