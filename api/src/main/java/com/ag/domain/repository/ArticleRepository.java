package com.ag.domain.repository;

import com.ag.domain.model.Article;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ArticleRepository extends ElasticsearchRepository<Article, String> {
    int countByArticleId(String articleId);
}