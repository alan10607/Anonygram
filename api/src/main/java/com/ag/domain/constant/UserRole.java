package com.ag.domain.constant;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserRole {
    ROLE_NORMAL(1),
    ROLE_ADMIN(2),
    ROLE_ANONYMOUS(3);
    public final int id;
}
