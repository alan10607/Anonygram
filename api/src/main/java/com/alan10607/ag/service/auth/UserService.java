package com.alan10607.ag.service.auth;

import com.alan10607.ag.constant.RoleType;
import com.alan10607.ag.dao.RoleDAO;
import com.alan10607.ag.dao.UserDAO;
import com.alan10607.ag.dto.UserDTO;
import com.alan10607.ag.exception.AnonygramIllegalStateException;
import com.alan10607.ag.model.ForumUser;
import com.alan10607.ag.model.Role;
import com.alan10607.ag.service.redis.lock.ForumLockService;
import com.alan10607.ag.service.redis.UserRedisService;
import com.alan10607.ag.util.TimeUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class UserService implements UserDetailsService{
    private final RoleService roleService;
    private final UserRedisService userRedisService;
    private final ForumLockService forumLockService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserDAO userDAO;
    private final RoleDAO roleDAO;

    /**
     * Spring security load username
     * @param email login email
     * @return UserDetails
     * @throws UsernameNotFoundException User not found
     */
    @Override
    public ForumUser loadUserByUsername(String email) throws UsernameNotFoundException {
        ForumUser forumUser = userDAO.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Email not found: %s", email)));

        log.debug("Spring security get user by email: {} succeeded", email);
        return forumUser;//Entity need extend org.springframework.security.core.UserDetails.User
    }

    public UserDTO get(String userId) {
        UserDTO userDTO = userRedisService.get(userId);
        if(StringUtils.isBlank(userDTO.getId())){
            forumLockService.lockByUser(userId, () -> pullToRedis(userId));
            userDTO = userRedisService.get(userId);
        }
        userRedisService.expire(userId);
        return userDTO;
    }

    private void pullToRedis(String userId) {
        UserDTO userDTO = userDAO.findById(userId)
                .map(user -> new UserDTO(user.getId(),
                        user.getUsername(),
                        user.getHeadUrl()))
                .orElseGet(() -> {
                    log.debug("Pull user failed, id={}, will put empty data to redis", userId);
                    return new UserDTO(userId, userId, "");
                });

        userRedisService.set(userDTO);
        userRedisService.expire(userId);
        log.info("Pull user to redis succeed, userId={}", userId);
    }

    public ForumUser getTempAnonymousUser(String tempId) {
        Role role = roleDAO.findByRoleName(RoleType.ANONYMOUS.name());
        ForumUser user = new ForumUser();
        user.setId(tempId);
        user.setUsername(tempId);
        user.setEmail("");
        user.setRole(Collections.singletonList(role));
        user.setUpdatedDate(TimeUtil.now());
        return user;
    }

    public void create(UserDTO userDTO, RoleType roleType) {
        userDAO.findByEmail(userDTO.getEmail()).ifPresent(gramUser -> {
            throw new AnonygramIllegalStateException("Email already exist");
        });

        userDAO.findByUsername(userDTO.getUsername()).ifPresent(gramUser -> {
            throw new AnonygramIllegalStateException("UserName already exist");
        });

        Role role = roleService.findRole(roleType.name());
        userDAO.save(new ForumUser(userDTO.getUsername(),
                                userDTO.getEmail(),
                                bCryptPasswordEncoder.encode(userDTO.getPassword()),
                                Collections.singletonList(role),
                                TimeUtil.now())
        );
    }

    public void update(UserDTO userDTO) {
        ForumUser user = userDAO.findById(userDTO.getId())
                .orElseThrow(() -> new AnonygramIllegalStateException("User not found"));

        Optional.ofNullable(userDTO.getHeadUrl()).ifPresent(user::setHeadUrl);
        Optional.ofNullable(userDTO.getLanguage()).ifPresent(user::setLanguage);
        Optional.ofNullable(userDTO.getTheme()).ifPresent(user::setTheme);
        userDAO.save(user);
        userRedisService.delete(userDTO.getId());
    }

    public void deleteUser(String email) {
        userDAO.findByEmail(email).ifPresentOrElse(
                forumUser -> {
                    userDAO.delete(forumUser);
                    userRedisService.delete(forumUser.getId());
                },
                () -> { throw new AnonygramIllegalStateException("Email not found"); });

    }

}