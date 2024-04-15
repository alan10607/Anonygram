package com.ag.domain.service;

import com.ag.domain.config.filter.JwtFilter;
import com.ag.domain.constant.TokenType;
import com.ag.domain.dto.TokenDTO;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.model.ForumUser;
import com.ag.domain.model.JwtToken;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;

import static com.ag.domain.TestUtil.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
class TokenServiceTest {

    @InjectMocks
    private TokenService tokenService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private HttpServletResponse httpServletResponse;

    @Mock
    private JwtFilter jwtFilter;

    @Test
    void createToken_should_success_because_authenticate_ok() {
        // Arrange
        ForumUser user = generateUser();
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setEmail(user.getEmail());
        tokenDTO.setPassword(user.getPassword());
        when(authenticationManager.authenticate(any())).thenReturn(generateUsernamePasswordAuthenticationToken(user));

        // Act
        TokenDTO result = tokenService.createToken(tokenDTO, httpServletResponse);
        JwtToken accessToken = new JwtToken.ParseFromTokenBuilder(result.getAccessToken()).build();
        JwtToken refreshToken = new JwtToken.ParseFromTokenBuilder(result.getRefreshToken()).build();

        // Assert
        assertEquals(user.getId(), accessToken.getUserId());
        assertEquals(TokenType.ACCESS_TOKEN, accessToken.getTokenType());
        assertEquals(user.getId(), refreshToken.getUserId());
        assertEquals(TokenType.REFRESH_TOKEN, refreshToken.getTokenType());
    }

    @Test
    void refreshToken_should_success_because_legal_refresh_token() {
        // Arrange
        ForumUser user = generateUser();
        JwtToken existingRefreshToken = new JwtToken.DefaultTokenBuilder(user, TokenType.REFRESH_TOKEN).build();
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setRefreshToken(existingRefreshToken.getValue());
        when(jwtFilter.getUserFromToken(any(JwtToken.class))).thenReturn(user);

        // Act
        TokenDTO result = tokenService.refreshToken(tokenDTO);
        JwtToken accessToken = new JwtToken.ParseFromTokenBuilder(result.getAccessToken()).build();
        JwtToken refreshToken = new JwtToken.ParseFromTokenBuilder(result.getRefreshToken()).build();

        // Assert
        assertEquals(user.getId(), accessToken.getUserId());
        assertEquals(TokenType.ACCESS_TOKEN, accessToken.getTokenType());
        assertEquals(user.getId(), refreshToken.getUserId());
        assertEquals(TokenType.REFRESH_TOKEN, refreshToken.getTokenType());
    }

    @Test
    void refreshToken_should_failed_because_illegal_refresh_token() {
        // Arrange
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setRefreshToken(generateRandomString(30));

        // Act & Assert
        assertThrows(Exception.class, () -> tokenService.refreshToken(tokenDTO));
    }

    @Test
    void validateEmail_should_success_because_is_not_blank() {
        // Arrange
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setEmail("test@com");

        // Act & Assert
        assertDoesNotThrow(() -> tokenService.validateEmail(tokenDTO));
    }

    @Test
    void validateEmail_should_failed_because_is_blank() {
        // Arrange
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setEmail("");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> tokenService.validateEmail(tokenDTO));
    }

    @Test
    void validatePassword_should_success_because_is_not_blank() {
        // Arrange
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setPassword("12345678");

        // Act & Assert
        assertDoesNotThrow(() -> tokenService.validatePassword(tokenDTO));
    }

    @Test
    void validatePassword_should_failed_because_is_blank() {
        // Arrange
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setPassword("");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> tokenService.validatePassword(tokenDTO));
    }

}