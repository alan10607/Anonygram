package com.ag.domain.service;

import com.ag.domain.dto.ArticleDTO;
import com.ag.domain.dto.UserDTO;
import com.ag.domain.repository.esQuery.ArticleQueryHandler;
import com.ag.domain.repository.esQuery.UserQueryHandler;
import com.ag.domain.util.PojoFiledUtil;
import com.ag.domain.util.ValidationUtil;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class QueryService {
    private final ArticleQueryHandler articleQueryHandler;
    private final UserQueryHandler userQueryHandler;
    private final ForumService forumService;

    private final Cache<String, List<String>> articleCache = CacheBuilder.newBuilder()
            .expireAfterAccess(5, TimeUnit.SECONDS)
            .maximumSize(1)
            .build();

    public static final int MAX_KEYWORD_LENGTH = 100;

    public List<String> queryArticleIds() {
        try {
            String cacheKey = "articleIds";
            return articleCache.get(cacheKey, articleQueryHandler::searchLatestArticleId);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    public List<ArticleDTO> queryArticle(String keyword) {
        validateKeyword(keyword);
        return articleQueryHandler.searchFirstArticleByWordOrTitle(keyword)
                .stream()
                .map(forumService::prepareArticle)
                .collect(Collectors.toList());
    }

    public List<UserDTO> queryUser(String keyword) {
        validateKeyword(keyword);
        return userQueryHandler.searchByUsername(keyword)
                .stream()
                .map(user -> PojoFiledUtil.convertObject(user, UserDTO.class))
                .map(userDTO -> PojoFiledUtil.retainFields(userDTO, "id", "username"))
                .collect(Collectors.toList());
    }

    void validateKeyword(String keyword) {
        ValidationUtil.assertInLength(keyword, MAX_KEYWORD_LENGTH, null, "Query keyword length must in {} and not blank", MAX_KEYWORD_LENGTH);
    }

}

