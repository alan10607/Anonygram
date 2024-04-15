package com.ag.domain.util;

import com.ag.domain.constant.UserRole;
import com.ag.domain.model.ForumUser;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import java.util.UUID;

import static com.ag.domain.TestUtil.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

class AuthUtilTest {

    private static ForumUser user = generateUser();
    private static ForumUser anonymousUser = new ForumUser.AnonymousUserBuilder(UUID.randomUUID()).build();
    private static UsernamePasswordAuthenticationToken loginAuth = generateUsernamePasswordAuthenticationToken(user);
    private static AnonymousAuthenticationToken anonymousAuth = generateAnonymousAuthenticationToken(anonymousUser);
    private static MockedStatic<SecurityContextHolder> mockedSecurityContextHolder;

    @BeforeAll
    public static void setup() {
        mockedSecurityContextHolder = mockStatic(SecurityContextHolder.class);
    }

    @AfterAll
    public static void tearDown() {
        mockedSecurityContextHolder.close();
    }

    @Test
    void getUser() {
        // Arrange
        when(SecurityContextHolder.getContext()).thenReturn(new SecurityContextImpl(loginAuth));

        // Act & Assert
        assertEquals(user, AuthUtil.getUser());
        assertNull(AuthUtil.getUser().getPassword());
    }

    @Test
    void getUser_when_anonymous() {
        // Arrange
        when(SecurityContextHolder.getContext()).thenReturn(new SecurityContextImpl(anonymousAuth));

        // Act & Assert
        assertEquals(anonymousUser, AuthUtil.getUser());
        assertNull(AuthUtil.getUser().getPassword());
    }


    @Test
    void getUserId() {
        // Arrange
        when(SecurityContextHolder.getContext()).thenReturn(new SecurityContextImpl(loginAuth));

        // Act & Assert
        assertEquals(user.getId(), AuthUtil.getUserId());
    }

    @Test
    void isSameUser() {
        // Arrange
        when(SecurityContextHolder.getContext()).thenReturn(new SecurityContextImpl(loginAuth));

        // Act & Assert
        assertTrue(AuthUtil.isSameUser(user.getId()));
    }

    @Test
    void isRolesHave() {
        // Arrange
        when(SecurityContextHolder.getContext()).thenReturn(new SecurityContextImpl(loginAuth));

        // Act & Assert
        for (UserRole role : UserRole.values()) {
            assertEquals(user.getRoles().contains(role), AuthUtil.isRolesHave(role));
        }
    }
}