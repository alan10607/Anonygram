package com.ag.domain.service;

import com.ag.domain.constant.ArticleStatus;
import com.ag.domain.dto.ArticleDTO;
import com.ag.domain.dto.QueryDTO;
import com.ag.domain.dto.UserDTO;
import com.ag.domain.model.Article;
import com.ag.domain.model.ForumUser;
import com.ag.domain.model.Like;
import com.ag.domain.repository.ArticleRepository;
import com.ag.domain.repository.LikeRepository;
import com.ag.domain.repository.UserRepository;
import com.ag.domain.repository.esQuery.ArticleQueryHandler;
import com.ag.domain.repository.esQuery.LikeQueryHandler;
import com.ag.domain.repository.esQuery.UserQueryHandler;
import com.ag.domain.util.AuthUtil;
import com.ag.domain.util.PojoFiledUtil;
import com.ag.domain.util.ValidationUtil;
import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final LikeQueryHandler likeQueryHandler;
    private final ArticleRepository articleRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    private final Cache<String, List<String>> articleCache = CacheBuilder.newBuilder()
            .expireAfterAccess(5, TimeUnit.SECONDS)
            .maximumSize(1)
            .build();

    public static final int MAX_QUERY_ARTICLE_SIZE = 10;
    public static final int MAX_KEYWORD_LENGTH = 100;
    public static final int PAGE_SIZE = 10;

    @Data
    private static class ArticleNoPage {
        private int start;
        private int end;
        ArticleNoPage(int page) {
            this.start = page == 0 ? 0 : (page - 1) * PAGE_SIZE;
            this.end = page == 0 ? 0 : page * PAGE_SIZE - 1;
        }
    }

    public List<String> queryArticleIds() {
        try {
            String cacheKey = "articleIds";
            return articleCache.get(cacheKey, articleQueryHandler::searchLatestArticleId);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    public List<QueryDTO> queryMultiArticle(List<String> articleIdList, int page) {
        validateArticleIdList(articleIdList);

        return articleIdList.stream()
                .map(articleId -> queryArticle(articleId, page))
                .collect(Collectors.toList());
    }

    public QueryDTO queryArticle(String articleId, int page) {
        validateArticleId(articleId);
        validatePage(page);

        ArticleStatus status = getFirstArticleStatus(articleId);
        switch (status) {
            case NORMAL:
                QueryDTO queryDTO = new QueryDTO(articleId, ArticleStatus.NORMAL);
                queryDTO.setCount(articleRepository.countByArticleId(articleId));
                ArticleNoPage articleNoPage = new ArticleNoPage(page);
                if(queryDTO.getCount() <= articleNoPage.getStart()) {
                    queryDTO.setArticleList(new ArrayList<>());
                }else {
                    queryDTO.setArticleList(articleQueryHandler.searchByArticleIdAndNo(articleId, articleNoPage.getStart(), articleNoPage.getEnd())
                            .stream()
                            .map(this::prepareArticle)
                            .collect(Collectors.toList()));
                }

                return queryDTO;
            case DELETED, UNKNOWN:
            default:
                return new QueryDTO(articleId, status);
        }
    }

    private ArticleDTO prepareArticle(Article article) {
        switch (article.getStatus()) {
            case NORMAL:
                ArticleDTO result = PojoFiledUtil.convertObject(article, ArticleDTO.class);
                prepareAuthorInfo(result);
                prepareLikeInfo(result);
                return result;
            case DELETED, UNKNOWN:
            default:
                return new ArticleDTO(article.getArticleId(), article.getNo(), article.getStatus());
        }
    }

    private void prepareAuthorInfo(ArticleDTO result) {
        ForumUser author = userRepository.findById(result.getAuthorId())
                .orElse(new ForumUser.AnonymousUserBuilder(result.getArticleId()).build());
        result.setAuthorName(author.getUsername());
        result.setAuthorHeadUrl(author.getHeadUrl());
    }

    private void prepareLikeInfo(ArticleDTO result) {
        boolean like = likeRepository.findById(new Like(result.getArticleId(), result.getNo(), AuthUtil.getUserId()).getId()).isPresent();
        result.setLike(like);

        long likeCount = likeQueryHandler.countByArticleIdAndNo(result.getArticleId(), result.getNo());
        result.setLikeCount(likeCount);
    }

    private ArticleStatus getFirstArticleStatus(String articleId) {
        return articleRepository.findById(new Article(articleId, 0).getId())
                .map(Article::getStatus)
                .orElse(ArticleStatus.UNKNOWN);
    }

    public List<ArticleDTO> queryArticle(String keyword) {
        validateKeyword(keyword);
        return articleQueryHandler.searchByWordOrTitle(keyword)
                .stream()
                .map(this::prepareArticle)
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

    void validateArticleIdList(List<String> articleIdList) {
        ValidationUtil.assertTrue(articleIdList.size() <= MAX_QUERY_ARTICLE_SIZE, "Article id list length must < {}", MAX_QUERY_ARTICLE_SIZE);
        articleIdList.forEach(this::validateArticleId);
    }

    void validateArticleId(String articleId) {
        ValidationUtil.assertUUID(articleId, "Article id is not a UUID");
    }

    void validatePage(int page) {
        ValidationUtil.assertInRange(page, 0, null, "Page must >= 0");
    }

    void validateKeyword(String keyword) {
        ValidationUtil.assertInLength(keyword, MAX_KEYWORD_LENGTH, null, "Query keyword length must in {} and not blank", MAX_KEYWORD_LENGTH);
    }

}

