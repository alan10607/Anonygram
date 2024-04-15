package com.ag.domain.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseCookie;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
class CookieUtilTest {

    @Mock
    private HttpServletRequest request;

    @Test
    public void createHttpOnlyCookie() {
        // Arrange
        String name = "testCookie";
        String value = "cookieValue";
        long maxAge = 3600;

        // Act
        ResponseCookie cookie = CookieUtil.createHttpOnlyCookie(name, value, maxAge);

        // Assert
        assertEquals(name, cookie.getName());
        assertEquals(value, cookie.getValue());
        assertEquals(maxAge, cookie.getMaxAge().getSeconds());
        assertEquals("/", cookie.getPath());
        assertEquals(true, cookie.isHttpOnly());
        assertEquals(true, cookie.isSecure());
    }

    @Test
    public void getCookieValue() {
        // Arrange
        Cookie[] cookies = {
                new Cookie("cookie1", "value1"),
                new Cookie("cookie2", "value2")
        };
        when(request.getCookies()).thenReturn(cookies);

        // Act & Assert
        assertEquals("value1", CookieUtil.getCookieValue(request, "cookie1"));
        assertEquals("value2", CookieUtil.getCookieValue(request, "cookie2"));
        assertNull(CookieUtil.getCookieValue(request, "cookie3"));
    }

}