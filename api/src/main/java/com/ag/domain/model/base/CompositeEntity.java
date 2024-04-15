package com.ag.domain.model.base;

import org.springframework.data.annotation.AccessType;
import org.springframework.data.annotation.Id;

public abstract class CompositeEntity {

    @Id
    @AccessType(AccessType.Type.PROPERTY)
    public abstract String getId();

    public void setId(String ignored) {
        // Ignored setter
    }

}
