package com.ag.domain.repository.esQuery;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.ag.domain.model.Like;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LikeQueryHandler extends QueryHandler<Like> {

    @Override
    protected Class<Like> getDocumentClass() {
        return Like.class;
    }

    public long countByArticleIdAndNo(String articleId, int no) {
        BoolQuery boolQuery = QueryBuilders.bool()
                .must(QueryBuilders.term(builder -> builder.field(Like.COL_ARTICLE_ID).value(articleId)))
                .must(QueryBuilders.term(builder -> builder.field(Like.COL_NO).value(no)))
                .build();

        return count(boolQuery);
    }

}
