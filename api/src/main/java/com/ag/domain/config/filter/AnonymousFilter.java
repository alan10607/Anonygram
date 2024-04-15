package com.ag.domain.config.filter;

import com.ag.domain.model.ForumUser;
import com.ag.domain.model.JwtToken;
import com.ag.domain.util.CookieUtil;
import com.ag.domain.util.ValidationUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import java.util.Optional;
import java.util.UUID;

@Configuration
@AllArgsConstructor
@Slf4j
public class AnonymousFilter extends BaseAuthenticationFilter<AnonymousAuthenticationToken> {
    public static final String ANONYMOUS_TOKEN = "Anonymous-Token";
    public static final long ANONYMOUS_COOKIE_MAX_AGE = 3600;

    @Override
    protected AnonymousAuthenticationToken extractAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String token = getAnonymousIdTokenFromRequest(request);
        boolean havePreviousToken = havePreviousToken(token);
        UUID uuid = havePreviousToken(token) ? UUID.fromString(token) : UUID.randomUUID();

        ForumUser user = new ForumUser.AnonymousUserBuilder(uuid).build();
        AnonymousAuthenticationToken anonymousToken = createAnonymousToken(user, request);
        if (!havePreviousToken) {
            response.addHeader(HttpHeaders.SET_COOKIE,
                    CookieUtil.createHttpOnlyCookie(ANONYMOUS_TOKEN, uuid.toString(), ANONYMOUS_COOKIE_MAX_AGE).toString());
        }
        return anonymousToken;
    }

    private boolean havePreviousToken(String token) {
        if (StringUtils.isNotBlank(token)) {
            try {
                UUID.fromString(token);
                return true;
            } catch (Exception e) {
                return false;
            }
        } else {
            return false;
        }
    }

    private String getAnonymousIdTokenFromRequest(HttpServletRequest request) {
        return Optional.ofNullable((request.getHeader(ANONYMOUS_TOKEN)))
                .filter(StringUtils::isNotBlank)
                .orElse(CookieUtil.getCookieValue(request, ANONYMOUS_TOKEN));
    }

    private AnonymousAuthenticationToken createAnonymousToken(ForumUser anonymousUser, HttpServletRequest request) {
        AnonymousAuthenticationToken authToken = new AnonymousAuthenticationToken(
                anonymousUser.getId(),
                anonymousUser,
                anonymousUser.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails((request)));
        return authToken;
    }

}