package com.alan10607.ag.dto;

import com.alan10607.ag.util.ToolUtil;

public abstract class BaseDTO {

    public <T> T to(Class<T> clazz) {
        return ToolUtil.convertValue(this, clazz);
    }

}