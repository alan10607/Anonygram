package com.ag.domain.util;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class TimeUtilTest {
    public ZoneId UTC_PLUS_8 = TimeUtil.UTC_PLUS_8;

    @Test
    public void testNow() {
        LocalDateTime expected = LocalDateTime.now(UTC_PLUS_8);
        assertEquals(expected.toInstant(ZoneOffset.UTC).getEpochSecond(),
                TimeUtil.now().toInstant(ZoneOffset.UTC).getEpochSecond());
    }

    @Test
    public void testNowString() {
        String format = "yyyy-MM-dd HH:mm:ss.SSS";
        String expected = LocalDateTime.now(UTC_PLUS_8).format(DateTimeFormatter.ofPattern(format));
        assertTrue(TimeUtil.nowString().startsWith(expected.substring(0, format.length() - 5)),
        "The difference between expected and actual time strings is within acceptable range");
    }

}