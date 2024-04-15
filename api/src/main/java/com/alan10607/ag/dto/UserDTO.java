package com.alan10607.ag.dto;

import com.alan10607.ag.model.Role;
import com.alan10607.ag.util.ToolUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.groups.Default;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO extends BaseDTO {

    private String id;

    @NotBlank(groups = registerGroup.class)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
    private List<Role> userRole;
    private String headUrl;
    private String language;
    private String theme;
    private LocalDateTime updatedDate;

    private String imageBase64;

    public UserDTO(String id,
                   String username,
                   String headUrl) {
        this.id = id;
        this.username = username;
        this.headUrl = headUrl;
    }


    public UserDTO(String id,
                   String username,
                   String email,
                   List<Role> userRole,
                   String headUrl,
                   String language,
                   String theme,
                   LocalDateTime updatedDate) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.userRole = userRole;
        this.headUrl = headUrl;
        this.language = language;
        this.theme = theme;
        this.updatedDate = updatedDate;
    }

    public interface registerGroup extends Default {
    }

    public static UserDTO from(Object data) {
        return ToolUtil.convertValue(data, UserDTO.class);
    }

}