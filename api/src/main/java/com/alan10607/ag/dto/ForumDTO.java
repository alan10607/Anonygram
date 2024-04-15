package com.alan10607.ag.dto;

import com.alan10607.ag.util.ToolUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.groups.Default;
import java.time.LocalDateTime;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ForumDTO extends BaseDTO {
    private String id;
    private Integer no;

    @NotBlank(groups = CreateArticleGroup.class)
    private String title;

    @NotBlank(groups = {CreateArticleGroup.class, ReplyForumGroup.class})
    private String word;
    private String authorId;
    private LocalDateTime createDate;

    @NotBlank(groups = UploadImageGroup.class)
    private String imageBase64;
    private String imageUrl;

    @NotNull(groups = LikeContentGroup.class)
    private Boolean like;

    public static ForumDTO from(Object data) {
        return ToolUtil.convertValue(data, ForumDTO.class);
    }

    public interface CreateArticleGroup extends Default {
    }

    public interface ReplyForumGroup extends Default {
    }

    public interface UploadImageGroup extends Default {
    }

    public interface LikeContentGroup extends Default {
    }
}