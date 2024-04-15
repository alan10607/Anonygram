package com.ag.domain.service;

import com.ag.domain.constant.UserRole;
import com.ag.domain.exception.EntityNotFoundException;
import com.ag.domain.model.ForumUser;
import com.ag.domain.repository.UserRepository;
import com.ag.domain.service.base.CrudServiceImpl;
import com.ag.domain.util.AuthUtil;
import com.ag.domain.util.TimeUtil;
import com.ag.domain.util.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class UserService extends CrudServiceImpl<ForumUser> implements UserDetailsService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    public static final int MAX_USERNAME_LENGTH = 50;
    public static final int MAX_EMAIL_LENGTH = 200;
    public static final int MAX_PASSWORD_LENGTH = 100;
    public static final int MAX_HEAD_URL_LENGTH = 200;
    public static final int MAX_LANGUAGE_LENGTH = 5;
    public static final int MAX_THEME_LENGTH = 10;

    /**
     * Spring security load username
     *
     * @param email login email
     * @return UserDetails
     * @throws UsernameNotFoundException User not found
     */
    @Override
    public ForumUser loadUserByUsername(String email) throws UsernameNotFoundException {
        ForumUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Email not found: %s", email)));

        log.debug("Spring security get user by email: {} succeeded", email);
        return user;//Entity need extend org.springframework.security.core.UserDetails.User
    }

    public ForumUser get(String userId) {
        return this.get(new ForumUser(userId));
    }

    @Override
    protected ForumUser getImpl(ForumUser user) {
        return userRepository.findById(user.getId()).orElse(null);
    }

    @Override
    protected ForumUser createImpl(ForumUser user) {
        LocalDateTime now = TimeUtil.now();
        if(user.getRoles().isEmpty()){
            user.setRoles(Collections.singletonList(UserRole.ROLE_NORMAL));
        }

        user = ForumUser.builder()
                .id(UUID.randomUUID().toString())
                .username(user.getUsername())
                .email(user.getEmail())
                .password(bCryptPasswordEncoder.encode(user.getPassword()))
                .roles(user.getRoles())
                .createdTime(now)
                .updatedTime(now)
                .build();

        return userRepository.save(user);
    }

    @Override
    protected ForumUser updateImpl(ForumUser user) {
        ForumUser existing = userRepository.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException(ForumUser.class));
        existing.setUsername(user.getUsername());
        existing.setEmail(user.getEmail());
        existing.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        existing.setRoles(user.getRoles());
        existing.setHeadUrl(user.getHeadUrl());
        existing.setLanguage(user.getLanguage());
        existing.setTheme(user.getTheme());
        existing.setUpdatedTime(TimeUtil.now());
        return userRepository.save(existing);
    }

    @Override
    protected ForumUser deleteImpl(ForumUser user) {
        userRepository.deleteById(user.getId());
        return user;
    }

    @Override
    protected void beforeGet(ForumUser user) {
        validateId(user);
    }

    @Override
    protected void beforeCreate(ForumUser user) {
        validateUsername(user);
        validateEmail(user);
        validatePassword(user);
        validateRoles(user);
        validateHeadUrl(user);
        validateLanguage(user);
        validateTheme(user);
    }

    @Override
    protected void beforeUpdateAndPatch(ForumUser user) {
        validateUsername(user);
        validateEmail(user);
        validatePassword(user);
        validateRoles(user);
        validateHeadUrl(user);
        validateLanguage(user);
        validateTheme(user);
        validateHavePermission(user);
    }

    @Override
    protected void beforeDelete(ForumUser user) {
        validateHavePermission(user);
    }

    void validateId(ForumUser user) {
        ValidationUtil.assertUUID(user.getId(), "User id is not a UUID");
    }

    void validateUsername(ForumUser user) {
        ValidationUtil.assertInLength(user.getUsername(), MAX_USERNAME_LENGTH, "Username length must in {} bytes and not blank", MAX_USERNAME_LENGTH);
        ValidationUtil.assertTrue(userRepository.findByUsername(user.getUsername()).isEmpty() || AuthUtil.isSameUser(user.getId()), "Username already exists");
    }

    void validateEmail(ForumUser user) {
        ValidationUtil.assertInLength(user.getEmail(), MAX_EMAIL_LENGTH, "Email length must in {} bytes and not blank", MAX_EMAIL_LENGTH);
        ValidationUtil.assertTrue(userRepository.findByEmail(user.getEmail()).isEmpty() || AuthUtil.isSameUser(user.getId()), "Email already exists");
    }

    void validatePassword(ForumUser user) {
        ValidationUtil.assertInLength(user.getPassword(), MAX_PASSWORD_LENGTH, "Password length must in {} bytes and not blank", MAX_PASSWORD_LENGTH);
    }

    void validateRoles(ForumUser user) {
        List<UserRole> notNormalRoles = Optional.ofNullable(user.getRoles())
                .orElse(Collections.emptyList())
                .stream()
                .filter(role -> !role.equals(UserRole.ROLE_NORMAL))
                .collect(Collectors.toList());

        ValidationUtil.assertTrue(notNormalRoles.isEmpty() || AuthUtil.isRolesHave(UserRole.ROLE_ADMIN), "No permission to add role {}", notNormalRoles);
    }

    void validateHeadUrl(ForumUser user) {
        ValidationUtil.assertInLengthOrNull(user.getHeadUrl(), MAX_HEAD_URL_LENGTH, "Head url length must in {} bytes or empty", MAX_HEAD_URL_LENGTH);
    }

    void validateLanguage(ForumUser user) {
        ValidationUtil.assertInLengthOrNull(user.getLanguage(), MAX_LANGUAGE_LENGTH, "Language length must in {} bytes or empty", MAX_LANGUAGE_LENGTH);
    }

    void validateTheme(ForumUser user) {
        ValidationUtil.assertInLengthOrNull(user.getTheme(), MAX_THEME_LENGTH, "Theme length must in {} bytes or empty", MAX_THEME_LENGTH);
    }

    void validateHavePermission(ForumUser user) {
        ValidationUtil.assertHavePermission(user.getId(), "No permission to update");
    }

}