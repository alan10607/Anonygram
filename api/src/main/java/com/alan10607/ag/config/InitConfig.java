package com.alan10607.ag.config;

import com.alan10607.ag.constant.RoleType;
import com.alan10607.ag.constant.TxnParamKey;
import com.alan10607.ag.dao.RoleDAO;
import com.alan10607.ag.dao.UserDAO;
import com.alan10607.ag.model.ForumUser;
import com.alan10607.ag.model.Role;
import com.alan10607.ag.service.TxnParamService;
import com.alan10607.ag.util.TimeUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Configuration
@AllArgsConstructor
@Slf4j
public class InitConfig {
    private final Environment environment;
    private final RoleDAO roleDAO;
    private final UserDAO userDAO;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ImgurConfig imgurConfig;
    private final TxnParamService txnParamService;

    @PostConstruct
    public void printProperties() {
        String[] properties = {
                "spring.profiles.active",
                "spring.datasource.url",
                "spring.datasource.username",
                "spring.datasource.password",
                "spring.redis.host",
                "spring.redis.port",
                "spring.redis.password",
                "spring.cors.frontend",
                "logging.path",
                "imgur.client.clientId",
                "imgur.client.clientSecret",
                "imgur.client.albumId"
        };

        StringBuffer console = new StringBuffer("Application Properties:");
        Arrays.stream(properties).forEach(arg ->
                console.append("\n")
                        .append(arg)
                        .append("=")
                        .append(environment.getProperty(arg)));

        log.info(console.toString());
    }

    @Bean
    @Order(1)
    public CommandLineRunner initRoleCommand(){
        return args -> {
            Set<Role> roleSet = new HashSet<>(roleDAO.findAll());
            List<Role> updateList = Arrays.stream(RoleType.values())
                    .map(roleType -> new Role(roleType.id, roleType.name()))
                    .filter(role -> !roleSet.contains(role))
                    .collect(Collectors.toList());
            roleDAO.saveAll(updateList);
        };
    }

    @Bean
    @Order(2)
    public CommandLineRunner initAdminCommand(){
        return args -> {
            String adminName = "alan10607";
            String adminEmail = "alan@alan";
            String adminPw = "alan";
            Role role = roleDAO.findByRoleName(RoleType.ADMIN.name());
            userDAO.findByEmail(adminEmail).orElseGet (() -> {
                ForumUser admin = new ForumUser(adminName,
                        adminEmail,
                        bCryptPasswordEncoder.encode(adminPw),
                        Collections.singletonList(role),
                        TimeUtil.now());
                return userDAO.save(admin);
            });
        };
    }

    @Bean
    @Order(3)
    public CommandLineRunner initImgurConfigCommand(){
        return args -> {
            String accessToken = txnParamService.get(TxnParamKey.IMGUR_ACCESS_TOKEN);
            String refreshToken = txnParamService.get(TxnParamKey.IMGUR_REFRESH_TOKEN);
            if (StringUtils.isBlank(accessToken) || StringUtils.isBlank(refreshToken)) {
                log.error("No imgur access token, need admin auth");
            }else {
                imgurConfig.setAccessToken(accessToken);
                imgurConfig.setRefreshToken(refreshToken);
                log.info("Get imgur access token from DB succeeded");
            }
        };
    }

}
