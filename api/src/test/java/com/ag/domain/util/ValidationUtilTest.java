package com.ag.domain.util;

import com.ag.domain.constant.UserRole;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.model.ForumUser;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.util.List;
import java.util.UUID;

import static com.ag.domain.TestUtil.generateUser;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

class ValidationUtilTest {

    private static MockedStatic<AuthUtil> mockedAuthUtil;
    private final String errorMessage = "Error message";

    @BeforeAll
    public static void setup() {
        mockedAuthUtil = mockStatic(AuthUtil.class);
    }

    @AfterAll
    public static void tearDown() {
        mockedAuthUtil.close();
    }

    @Test
    public void assertTrue_should_success_because_is_true() {
        assertDoesNotThrow(() -> ValidationUtil.assertTrue(true, errorMessage));
    }

    @Test
    public void assertTrue_should_failed_because_is_false() {
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertTrue(false, errorMessage));
    }

    @Test
    public void assertFalse_should_success_because_is_false() {
        assertDoesNotThrow(() -> ValidationUtil.assertFalse(false, errorMessage));
    }

    @Test
    public void assertFalse_should_failed_because_is_true() {
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertFalse(true, errorMessage));
    }

    @Test
    public void assertUUID_should_success_with_valid_UUID_string() {
        assertDoesNotThrow(() -> ValidationUtil.assertUUID("550e8400-e29b-41d4-a716-446655440000", errorMessage));
    }

    @Test
    public void assertUUID_should_failed_with_invalid_UUID_string() {
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertUUID("invalidUUID", errorMessage));
    }

    @Test
    public void assertInRange_should_success_with_value_within_range() {
        assertDoesNotThrow(() -> ValidationUtil.assertInRange(5, 1, 10, errorMessage));
    }

    @Test
    public void assertInRange_should_failed_with_value_out_of_range() {
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertInRange(15, 1, 10, errorMessage));
    }

    @Test
    public void assertInLength_should_success_with_valid_string_length() {
        assertDoesNotThrow(() -> ValidationUtil.assertInLength("abcdef", 10, errorMessage));
    }

    @Test
    public void assertInLength_should_failed_with_invalid_string_length() {
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertInLength("abcdefghij", 5, errorMessage));
    }

    @Test
    public void assertInLength_should_failed_with_null_string() {
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertInLength(null, 5, errorMessage));
    }

    @Test
    public void assertInLengthOrNull_should_success_with_valid_string_length() {
        assertDoesNotThrow(() -> ValidationUtil.assertInLengthOrNull("abcdef", 10, errorMessage));
    }

    @Test
    public void assertInLengthOrNull_should_success_with_null_string() {
        assertDoesNotThrow(() -> ValidationUtil.assertInLengthOrNull(null, 10, errorMessage));
    }

    @Test
    public void assertInLengthOrNull_should_failed_with_invalid_string_length() {
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertInLengthOrNull("abcdefghij", 5, errorMessage));
    }

    @Test
    public void assertHavePermission_should_success_with_user_self() {
        // Arrange
        ForumUser user = generateUser();
        when(AuthUtil.getUser()).thenReturn(user);

        // Act & Assert
        assertDoesNotThrow(() -> ValidationUtil.assertHavePermission(user.getId(), errorMessage));
    }

    @Test
    public void assertHavePermission_should_success_with_admin() {
        // Arrange
        ForumUser user = generateUser();
        user.setRoles(List.of(UserRole.ROLE_NORMAL, UserRole.ROLE_ADMIN));
        when(AuthUtil.getUser()).thenReturn(user);

        // Act & Assert
        assertDoesNotThrow(() -> ValidationUtil.assertHavePermission(UUID.randomUUID().toString(), errorMessage));
    }

    @Test
    public void assertHavePermission_should_failed_with_invalid_user() {
        // Arrange
        ForumUser user = generateUser();
        when(AuthUtil.getUser()).thenReturn(user);

        // Act & Assert
        assertThrows(AgValidationException.class, () -> ValidationUtil.assertHavePermission(UUID.randomUUID().toString(), errorMessage));
    }

}