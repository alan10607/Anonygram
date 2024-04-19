package com.ag.domain.repository;

import com.ag.domain.model.Article;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface ArticleRepository extends ElasticsearchRepository<Article, String> {
    int countByArticleId(String articleId);
    List<Article> findByArticleId(String articleId);
}