package com.ag.domain.constant;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ArticleStatus {
    NORMAL("normal"),
    DELETED("deleted"),
    THREAD_DELETED("threadDeleted"),
    UNKNOWN("unknown");
    public final String value;
}