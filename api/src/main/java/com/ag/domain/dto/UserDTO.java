package com.ag.domain.dto;

import com.ag.domain.constant.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO {
    private String id;
    private String username;
    private String email;
    private String password;
    private List<UserRole> roles;
    private String headUrl;
    private String language;
    private String theme;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;

}