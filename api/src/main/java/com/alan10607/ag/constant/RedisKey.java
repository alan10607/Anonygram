package com.alan10607.ag.constant;

public class RedisKey {
    public static final String ID = "data:id";
    public static final String ID_STR = "data:idStr";
    public static final String ARTICLE = "data:art:%s";
    public static final String CONTENT = "data:cont:%s:%s";
    public static final String LIKE = "data:cont:%s:%s:like:%s";
    public static final String USER = "data:user:%s";
    public static final String LOCK_ARTICLE = "lock:art:%s";
    public static final String LOCK_CONTENT = "lock:cont:%s:%s";
    public static final String LOCK_USER = "lock:user:%s";
    public static final String LOCK_SAVE_LIKE_BATCH = "lock:saveLikeBatch";
}