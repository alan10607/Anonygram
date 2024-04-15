package com.ag.domain.config;

import com.ag.domain.constant.UserRole;
import com.ag.domain.model.ForumUser;
import com.ag.domain.repository.UserRepository;
import com.ag.domain.util.TimeUtil;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
@Slf4j
@Data
@ConfigurationProperties(prefix = "forum.admin")
public class AdminDefaultConfig {
    private String email;
    private String username;
    private String password;
    private String adminId = "73cf52b9-ca68-4efd-bae1-11d454bb06ff";

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostConstruct
    public void initAdmin() {
        if (userRepository.findById(adminId).isEmpty()) {
            LocalDateTime now = TimeUtil.now();
            ForumUser admin = ForumUser.builder()
                    .id(adminId)
                    .username(username)
                    .email(email)
                    .password(bCryptPasswordEncoder.encode(password))
                    .roles(List.of(UserRole.ROLE_ADMIN, UserRole.ROLE_NORMAL))
                    .createdTime(now)
                    .updatedTime(now)
                    .build();

            userRepository.save(admin);
            log.info("Initializing default admin done");
        }
    }
}