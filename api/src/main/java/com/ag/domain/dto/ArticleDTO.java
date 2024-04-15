package com.ag.domain.dto;

import com.ag.domain.constant.ArticleStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleDTO {
    @NotNull
    private String articleId;

    @NotNull
    @Min(0)
    private Integer no;

    @NotBlank
    private String authorId;

    @NotBlank
    private String title;

    @NotBlank
    private String word;

    @NotNull
    private ArticleStatus status;

    @NotNull
    private LocalDateTime createdTime;

    @NotNull
    private LocalDateTime updatedTime;

    private Long likeCount;
    private Boolean like;
    private String authorName;
    private String authorHeadUrl;

    public ArticleDTO(String articleId, Integer no, ArticleStatus status) {
        this.articleId = articleId;
        this.no = no;
        this.status = status;
    }

}