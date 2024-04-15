package com.ag.domain.constant;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ArticleStatus {
    NORMAL("normal"),
    DELETED("deleted"),
    UNKNOWN("unknown");
    public final String value;
}