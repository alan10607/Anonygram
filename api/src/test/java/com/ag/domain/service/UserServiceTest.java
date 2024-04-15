package com.ag.domain.service;

import com.ag.domain.constant.UserRole;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.model.ForumUser;
import com.ag.domain.repository.UserRepository;
import com.ag.domain.util.AuthUtil;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static com.ag.domain.TestUtil.generateRandomString;
import static com.ag.domain.TestUtil.generateUser;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private static MockedStatic<AuthUtil> mockedAuthUtil;

    @BeforeAll
    public static void setup() {
        mockedAuthUtil = mockStatic(AuthUtil.class);
    }

    @AfterAll
    public static void tearDown() {
        mockedAuthUtil.close();
    }

    @Test
    void validateId_should_success_because_is_uuid() {
        // Arrange
        ForumUser user = generateUser(UUID.randomUUID().toString());

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateId(user));
    }

    @Test
    void validateId_should_failed_because_not_uuid() {
        // Arrange
        ForumUser user = generateUser("1234");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateId(user));
    }

    @Test
    void validateUsername_should_success_because_length_within_max_limit_and_not_exist() {
        // Arrange
        ForumUser user = generateUser();
        user.setUsername(generateRandomString(UserService.MAX_USERNAME_LENGTH));
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.empty());
        when(AuthUtil.isSameUser(user.getId())).thenReturn(false);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateUsername(user));
    }

    @Test
    void validateUsername_should_success_because_length_within_max_limit_and_by_user_self() {
        // Arrange
        ForumUser user = generateUser();
        user.setUsername(generateRandomString(UserService.MAX_USERNAME_LENGTH));
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(AuthUtil.isSameUser(user.getId())).thenReturn(true);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateUsername(user));
    }

    @Test
    void validateUsername_should_failed_because_length_exceeds_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setUsername(generateRandomString(UserService.MAX_USERNAME_LENGTH + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateUsername(user));
    }

    @Test
    void validateUsername_should_failed_because_username_already_exists_and_not_by_user_self() {
        // Arrange
        ForumUser user = generateUser();
        user.setUsername(generateRandomString(UserService.MAX_USERNAME_LENGTH));
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));
        when(AuthUtil.isSameUser(user.getId())).thenReturn(false);

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateUsername(user));
    }


    @Test
    void validateEmail_should_success_because_length_within_max_limit_and_not_exist() {
        // Arrange
        ForumUser user = generateUser();
        user.setEmail(generateRandomString(UserService.MAX_EMAIL_LENGTH));
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(AuthUtil.isSameUser(user.getId())).thenReturn(false);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateEmail(user));
    }

    @Test
    void validateEmail_should_success_because_length_within_max_limit_and_by_user_self() {
        // Arrange
        ForumUser user = generateUser();
        user.setEmail(generateRandomString(UserService.MAX_EMAIL_LENGTH));
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(AuthUtil.isSameUser(user.getId())).thenReturn(true);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateEmail(user));
    }

    @Test
    void validateEmail_should_failed_because_length_exceeds_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setEmail(generateRandomString(UserService.MAX_EMAIL_LENGTH + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateEmail(user));
    }

    @Test
    void validateEmail_should_failed_because_email_already_exists_and_not_by_user_self() {
        // Arrange
        ForumUser user = generateUser();
        user.setEmail(generateRandomString(UserService.MAX_EMAIL_LENGTH));
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(AuthUtil.isSameUser(user.getId())).thenReturn(false);

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateEmail(user));
    }

    @Test
    void validatePassword_should_success_because_length_within_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setPassword(generateRandomString(UserService.MAX_PASSWORD_LENGTH));

        // Act & Assert
        assertDoesNotThrow(() -> userService.validatePassword(user));
    }

    @Test
    void validatePassword_should_failed_because_length_exceeds_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setPassword(generateRandomString(UserService.MAX_PASSWORD_LENGTH + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validatePassword(user));
    }

    @Test
    void validatePassword_should_failed_because_is_blank() {
        // Arrange
        ForumUser user = generateUser();
        user.setPassword("");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validatePassword(user));
    }

    @Test
    void validateRoles_should_success_because_only_normal_role() {
        // Arrange
        ForumUser user = generateUser();
        user.setRoles(Collections.singletonList(UserRole.ROLE_NORMAL));

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateRoles(user));
    }

    @Test
    void validateRoles_should_failed_because_have_not_normal_role() {
        // Arrange
        ForumUser user = generateUser();
        user.setRoles(Collections.singletonList(UserRole.ROLE_ADMIN));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateRoles(user));
    }

    @Test
    void validateHeadUrl_should_success_because_length_within_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        String prefix = "https://";
        user.setHeadUrl(prefix + generateRandomString(UserService.MAX_HEAD_URL_LENGTH - prefix.length()));

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateHeadUrl(user));
    }

    @Test
    void validateHeadUrl_should_success_because_is_null() {
        // Arrange
        ForumUser user = generateUser();
        user.setHeadUrl(null);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateHeadUrl(user));
    }

    @Test
    void validateHeadUrl_should_failed_because_length_exceeds_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        String prefix = "https://";
        user.setHeadUrl(prefix + generateRandomString(UserService.MAX_HEAD_URL_LENGTH - prefix.length() + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateHeadUrl(user));
    }

    @Test
    void validateHeadUrl_should_failed_because_is_blank() {
        // Arrange
        ForumUser user = generateUser();
        user.setHeadUrl("");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateHeadUrl(user));
    }

    @Test
    void validateLanguage_should_success_because_length_within_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setLanguage(generateRandomString(UserService.MAX_LANGUAGE_LENGTH));

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateLanguage(user));
    }

    @Test
    void validateLanguage_should_success_because_is_null() {
        // Arrange\
        ForumUser user = generateUser();
        user.setLanguage(null);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateLanguage(user));
    }

    @Test
    void validateLanguage_should_failed_because_length_exceeds_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setLanguage(generateRandomString(UserService.MAX_LANGUAGE_LENGTH + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateLanguage(user));
    }

    @Test
    void validateLanguage_should_failed_because_is_blank() {
        // Arrange
        ForumUser user = generateUser();
        user.setLanguage("");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateLanguage(user));
    }

    @Test
    void validateTheme_should_success_because_length_within_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setTheme(generateRandomString(UserService.MAX_THEME_LENGTH));

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateTheme(user));
    }

    @Test
    void validateTheme_should_success_because_is_null() {
        // Arrange
        ForumUser user = generateUser();
        user.setTheme(null);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateTheme(user));
    }

    @Test
    void validateTheme_should_failed_because_length_exceeds_max_limit() {
        // Arrange
        ForumUser user = generateUser();
        user.setTheme(generateRandomString(UserService.MAX_THEME_LENGTH + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateTheme(user));
    }

    @Test
    void validateTheme_should_failed_because_is_blank() {
        // Arrange
        ForumUser user = generateUser();
        user.setTheme("");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateTheme(user));
    }

    @Test
    void validateHavePermission_should_succeed_because_by_self() {
        // Arrange
        ForumUser user = generateUser();
        when(AuthUtil.getUser()).thenReturn(user);

        // Act & Assert
        assertDoesNotThrow(() -> userService.validateHavePermission(user));
    }

    @Test
    void validateHavePermission_should_failed_because_not_by_self() {
        // Arrange
        ForumUser user = generateUser();
        when(AuthUtil.getUser()).thenReturn(generateUser(UUID.randomUUID().toString()));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> userService.validateHavePermission(user));
    }

}