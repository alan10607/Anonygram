package com.alan10607.ag.exception.base;

import org.slf4j.helpers.MessageFormatter;

public class AnonygramRuntimeException extends IllegalStateException {

    public AnonygramRuntimeException(String format, Object... args) {
        super(MessageFormatter.arrayFormat(format, args).getMessage());
    }

}
