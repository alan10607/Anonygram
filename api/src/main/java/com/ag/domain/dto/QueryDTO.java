package com.ag.domain.dto;

import com.ag.domain.constant.ArticleStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class QueryDTO {
    private String articleId;
    private ArticleStatus status;
    private Integer count;
    private List<ArticleDTO> articleList;

    public QueryDTO(String articleId, ArticleStatus status) {
        this.articleId = articleId;
        this.status = status;
    }

}