package com.ag.domain.model;

import com.ag.domain.constant.ArticleStatus;
import com.ag.domain.model.base.CompositeEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(indexName = "article")
public class Article extends CompositeEntity {
    @Field(type = FieldType.Keyword)
    private String articleId;

    @Field(type = FieldType.Integer)
    private Integer no;

    @Field(type = FieldType.Keyword)
    private String authorId;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String word;

    @Field(type = FieldType.Keyword)
    private ArticleStatus status;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime createdTime;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime updatedTime;

    public static final String COL_ARTICLE_ID = "articleId";
    public static final String COL_NO = "no";
    public static final String COL_TITLE = "title";
    public static final String COL_WORD = "word";
    public static final String COL_STATUS = "status";
    public static final String COL_CREATED_TIME = "createdTime";

    public Article(String articleId, Integer no) {
        this.articleId = articleId;
        this.no = no;
    }

    @Override
    public String getId() {
        return String.format("%s:%s", articleId, no);
    }


    public boolean isCreatingFirstArticle() {
        return this.articleId == null && this.no == 0;
    }

    public void setCreatingFirstArticle() {
        this.articleId = null;
        this.no = 0;
    }

    public boolean isCreatingReplyArticle() {
        return StringUtils.isNotBlank(this.articleId) && this.no == null;
    }

    public void setCreatingReplyArticle(String articleId) {
        this.articleId = articleId;
        this.no = null;
    }

}