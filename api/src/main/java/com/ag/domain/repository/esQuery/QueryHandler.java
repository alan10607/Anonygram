package com.ag.domain.repository.esQuery;

import co.elastic.clients.elasticsearch._types.SortOptions;
import co.elastic.clients.elasticsearch._types.SortOptionsBuilders;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchAggregations;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public abstract class QueryHandler<T> {
    @Autowired
    protected ElasticsearchOperations elasticsearchOperations;
    private static final Pageable DEFAULT_PAGEABLE = Pageable.ofSize(100);
    private static final SortOptions DEFAULT_SORT_OPTIONS = SortOptionsBuilders.score()
            .order((SortOrder.Desc))
            .build()
            ._toSortOptions();

    protected abstract Class<T> getDocumentClass();

    public List<T> search(BoolQuery boolQuery) {
        return search(boolQuery, DEFAULT_SORT_OPTIONS, DEFAULT_PAGEABLE);
    }

    public List<T> search(BoolQuery boolQuery, SortOptions sortOptions) {
        return search(boolQuery, sortOptions, DEFAULT_PAGEABLE);
    }

    public List<T> search(BoolQuery boolQuery, SortOptions sortOptions, Pageable pageable) {
        NativeQuery nativeQuery = NativeQuery.builder()
                .withQuery(boolQuery._toQuery())
                .withSort(sortOptions)
                .withPageable(pageable)
                .build();

        return elasticsearchOperations.search(nativeQuery, getDocumentClass())
                .stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());
    }

    public long count(BoolQuery boolQuery) {
        NativeQuery nativeQuery = NativeQuery.builder()
                .withQuery(boolQuery._toQuery())
                .build();

        return elasticsearchOperations.count(nativeQuery, getDocumentClass());
    }

    public List<String> searchAggregation(String aggregationName, Aggregation aggregation) {
        NativeQuery nativeQuery = NativeQuery.builder()
                .withQuery(QueryBuilders.matchAll().build()._toQuery())
                .withAggregation(aggregationName, aggregation)
                .build();

        SearchHits<T> searchHits = elasticsearchOperations.search(nativeQuery, getDocumentClass());
        return Optional.ofNullable((ElasticsearchAggregations) searchHits.getAggregations())
                .map(elasticsearchAggregations -> elasticsearchAggregations.aggregationsAsMap().get(aggregationName))
                .map(a -> a.aggregation().getAggregate().sterms().buckets().array())
                .orElse(Collections.emptyList())
                .stream()
                .map(bucket -> bucket.key().stringValue())
                .collect(Collectors.toList());
    }

}
