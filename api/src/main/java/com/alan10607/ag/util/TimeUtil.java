package com.alan10607.ag.util;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Component
public class TimeUtil {
    public static final ZoneId UTC_PLUS_8 = ZoneId.of("UTC+8");
    public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
    public static final DateTimeFormatter FORMATTER_SHORT = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    public static LocalDateTime now(){
        return LocalDateTime.now(UTC_PLUS_8);
    }

    public static String nowString(){
        return now().format(FORMATTER);
    }

    public static String nowShortString(){
        return now().format(FORMATTER_SHORT);
    }

}