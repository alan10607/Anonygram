package com.alan10607.ag.config;

import com.alan10607.ag.constant.RoleType;
import com.alan10607.ag.util.ToolUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@Slf4j
@Data
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    private final CsrfDoubleSubmitFilter csrfDoubleSubmitFilter;
    private final AuthenticationProvider authenticationProvider;
    public static final String ERROR_PAGE_PATH = "/err";//Redirect error status to this page
    public static final String FORUM_PATH = "/forum/**";
    public static final String AUTH_PATH = "/auth/**";
    public static final String REDIS_PATH = "/redis/**";
    public static final String IMGUR_PATH = "/imgur/**";
    public static final String USER_PATH = "/user/**";
    public static final String[] SWAGGER_PATH = { "/swagger-ui/**", "/v3/api-docs/**" };
    public static final String[] WEB_STATIC_PATH = { "/css/**", "/js/**", "/pic/**", "/", "/index", ERROR_PAGE_PATH, "/ssl" };
    public static final String[] PRIVATE_TEMPLATE_PATH = { "/redirect" };

    public static final String[] REST_APIS = { FORUM_PATH, AUTH_PATH, REDIS_PATH, IMGUR_PATH, USER_PATH };
    
    /**
     * Web security, replace WebSecurityConfigurerAdapter.configure(HttpSecurity http)
     * @param http
     * @return
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()//disable spring security default Cross-site request forgery
            .cors()
            .and()
                .authorizeRequests()
                .antMatchers(flatPaths(WEB_STATIC_PATH, SWAGGER_PATH, AUTH_PATH))
                .permitAll()//public page
                .antMatchers(flatPaths(FORUM_PATH, USER_PATH))
                .hasAnyAuthority(RoleType.NORMAL.name(), RoleType.ANONYMOUS.name(), RoleType.ADMIN.name())//Need login and jwt token
                .anyRequest()
                .hasAuthority(RoleType.ADMIN.name())
            .and()
                .exceptionHandling()
                .accessDeniedPage(ERROR_PAGE_PATH)
            .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)//no session
            .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(csrfDoubleSubmitFilter, CsrfFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(@Value("${spring.cors.frontend}") String frontendUrl) {
        log.info("CORS allowed origin frontend url={}", frontendUrl);
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(frontendUrl);
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Error pages
     * @return
     */
    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
        return factory -> {
            factory.addErrorPages(
                    new ErrorPage(HttpStatus.NOT_FOUND, ERROR_PAGE_PATH),//404
                    new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_PAGE_PATH));//500
        };
    }

    private String[] flatPaths(Object... paths){
        return ToolUtil.flatten(paths).toArray(String[]::new);
    }


}