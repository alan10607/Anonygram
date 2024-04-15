package com.ag.domain.model;

import com.ag.domain.constant.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(indexName = "user")
public class ForumUser implements UserDetails {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String username;

    @Field(type = FieldType.Keyword)
    private String email;

    @Field(type = FieldType.Text)
    private String password;

    @Field(type = FieldType.Text)
    private List<UserRole> roles;

    @Field(type = FieldType.Text)
    private String headUrl;

    @Field(type = FieldType.Text)
    private String language;

    @Field(type = FieldType.Text)
    private String theme;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime createdTime;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime updatedTime;

    public static final String COL_USERNAME = "username";

    public ForumUser(String id) {
        this.id = id;
    }

    public ForumUser(AnonymousUserBuilder builder) {
        this.id = builder.id;
        this.username = builder.username;
        this.roles = builder.roles;
        this.email = null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isAnonymous() {
        return StringUtils.isBlank(email);
    }

    public static class AnonymousUserBuilder {
        private final String id;
        private final String username;
        private final List<UserRole> roles = Collections.singletonList(UserRole.ROLE_ANONYMOUS);

        public AnonymousUserBuilder(String id) {
            this.id = id;
            this.username = id;
        }

        public AnonymousUserBuilder(UUID uuid) {
            String id = get8Base64(uuid.toString());
            this.id = id;
            this.username = id;
        }


        public ForumUser build() {
            return new ForumUser(this);
        }

        private String get8Base64(String s) {
            return Base64.getEncoder().encodeToString(hashTo6Bytes(s.getBytes()));
        }

        /**
         * XOR every 6 bytes in a loop, and encoding those 6 bytes with Base64 results in exactly 8 characters
         *
         * @param bytes session bytes
         * @return hash id code
         */
        private byte[] hashTo6Bytes(byte[] bytes) {
            byte[] base64 = new byte[6];
            for (int i = 0; i < bytes.length; i++)
                base64[i % 6] ^= (bytes[i] & 0xFF);//& 0xFF: 只取8bits

            return base64;
        }
    }
}