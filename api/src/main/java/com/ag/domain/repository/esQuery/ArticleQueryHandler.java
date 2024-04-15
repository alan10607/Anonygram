package com.ag.domain.repository.esQuery;

import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOptionsBuilders;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.AggregationBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryField;
import co.elastic.clients.json.JsonData;
import co.elastic.clients.util.NamedValue;
import com.ag.domain.constant.ArticleStatus;
import com.ag.domain.model.Article;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ArticleQueryHandler extends QueryHandler<Article> {
    private static final String AGGREGATION_MAX_CREATED_TIME = "max_createdTime";
    private static final String AGGREGATION_LATEST_ARTICLES = "latest_articles";

    @Override
    protected Class<Article> getDocumentClass() {
        return Article.class;
    }

    public List<Article> searchByArticleIdListAndNo(List<String> articleIdList, int noGte, int noLte) {
        TermsQueryField termsQueryField = new TermsQueryField.Builder()
                .value(articleIdList.stream().map(FieldValue::of).collect(Collectors.toList()))
                .build();

        BoolQuery boolQuery = QueryBuilders.bool()
                .must(QueryBuilders.terms(builder -> builder.field(Article.COL_ARTICLE_ID).terms(termsQueryField)))
                .must(QueryBuilders.range(builder -> builder.field(Article.COL_NO).gte(JsonData.of(noGte)).lte(JsonData.of(noLte))))
                .build();

        SortOptions sortOptions = SortOptionsBuilders.field(builder -> builder.field(Article.COL_NO).order(SortOrder.Asc));

        return search(boolQuery, sortOptions);
    }

    public List<Article> searchByArticleIdAndNo(String articleId, int noGte, int noLte) {
        BoolQuery boolQuery = QueryBuilders.bool()
                .must(QueryBuilders.term(builder -> builder.field(Article.COL_ARTICLE_ID).value(articleId)))
                .must(QueryBuilders.range(builder -> builder.field(Article.COL_NO).gte(JsonData.of(noGte)).lte(JsonData.of(noLte))))
                .build();

        SortOptions sortOptions = SortOptionsBuilders.field(builder -> builder.field(Article.COL_NO).order(SortOrder.Asc));

        return search(boolQuery, sortOptions);
    }

    public List<String> searchLatestArticleId() {
        Aggregation maxCreatedTimeAggregation = AggregationBuilders.max(builder -> builder.field(Article.COL_CREATED_TIME));
        Map<String, Aggregation> subAggregation = ImmutableMap.<String, Aggregation>builder()
                .put(AGGREGATION_MAX_CREATED_TIME, maxCreatedTimeAggregation)
                .build();

        Aggregation aggregation = new Aggregation.Builder()
                .terms(builder -> builder.field(Article.COL_ARTICLE_ID)
                        .size(1000)
                        .order(ImmutableList.of(NamedValue.of(AGGREGATION_MAX_CREATED_TIME, SortOrder.Desc))))
                .aggregations(subAggregation).build();

        return searchAggregation(AGGREGATION_LATEST_ARTICLES, aggregation);
    }

    public List<Article> searchByWordOrTitle(String keyword) {
        BoolQuery boolQuery = QueryBuilders.bool()
                .must(QueryBuilders.multiMatch(builder -> builder.fields(List.of(Article.COL_WORD, Article.COL_TITLE)).query(keyword)))
                .must(QueryBuilders.term(builder -> builder.field(Article.COL_STATUS).value(ArticleStatus.NORMAL.value)))
                .build();

        return search(boolQuery);
    }

}
