package com.ag.domain.repository.esQuery;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.ag.domain.model.ForumUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class UserQueryHandler extends QueryHandler<ForumUser> {

    @Override
    protected Class<ForumUser> getDocumentClass() {
        return ForumUser.class;
    }

    public List<ForumUser> searchByUsername(String keyword) {
        BoolQuery boolQuery = QueryBuilders.bool()
                .must(QueryBuilders.match(builder -> builder.field(ForumUser.COL_USERNAME).query(keyword)))
                .build();

        return search(boolQuery);
    }

}
