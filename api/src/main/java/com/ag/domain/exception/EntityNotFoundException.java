package com.ag.domain.exception;

import com.ag.domain.exception.base.AnonygramRuntimeException;

public class EntityNotFoundException extends AnonygramRuntimeException {

    public EntityNotFoundException() {
        super();
    }

    public EntityNotFoundException(String format, Object... args) {
        super(format, args);
    }

    public EntityNotFoundException(Class<?> clazz) {
        super("Entity {} not found", clazz.getSimpleName());
    }

}
