package com.ag.domain.util;

import com.ag.domain.constant.UserRole;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.model.ForumUser;
import org.apache.commons.lang3.StringUtils;

import java.util.UUID;

public class ValidationUtil {

    public static void assertTrue(boolean condition, String errorMessage, Object... args) {
        if (!condition) {
            throw new AgValidationException(errorMessage, args);
        }
    }

    public static void assertFalse(boolean condition, String errorMessage, Object... args) {
        assertTrue(!condition, errorMessage, args);
    }

    public static void assertUUID(String uuidString, String errorMessage, Object... args) {
        assertTrue(isUuid(uuidString), errorMessage, args);
    }

    public static void assertInRange(Integer value, Integer min, Integer max, String errorMessage, Object... args) {
        assertTrue(value != null && (min == null || value >= min) && (max == null || value <= max), errorMessage, args);
    }

    public static void assertInLength(String string, int maxLength, String errorMessage, Object... args) {
        assertTrue(StringUtils.isNotBlank(string) && string.getBytes().length <= maxLength, errorMessage, args);
    }

    public static void assertInLengthOrNull(String string, int maxLength, String errorMessage, Object... args) {
        assertTrue(string == null || (StringUtils.isNotBlank(string) && string.getBytes().length <= maxLength), errorMessage, args);
    }

    public static void assertHavePermission(String userId, String errorMessage, Object... args) {
        ForumUser user = AuthUtil.getUser();
        assertTrue(user.getId().equals(userId) || user.getRoles().contains(UserRole.ROLE_ADMIN), errorMessage, args);
    }

    public static boolean isUuid(String string) {
        if (StringUtils.isNotBlank(string)) {
            try {
                UUID.fromString(string);
                return true;
            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }
    }

}