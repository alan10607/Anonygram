package com.ag.domain.exception.base;

import org.slf4j.helpers.MessageFormatter;

public class AnonygramRuntimeException extends RuntimeException {

    public AnonygramRuntimeException() {
        super();
    }

    public AnonygramRuntimeException(Throwable cause) {
        super(cause);
    }

    public AnonygramRuntimeException(String format, Object... args) {
        super(MessageFormatter.arrayFormat(format, args).getMessage());
    }

}
