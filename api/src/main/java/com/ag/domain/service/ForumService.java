package com.ag.domain.service;

import com.ag.domain.constant.ArticleStatus;
import com.ag.domain.dto.ArticleDTO;
import com.ag.domain.dto.ForumDTO;
import com.ag.domain.model.Article;
import com.ag.domain.model.ForumUser;
import com.ag.domain.model.Like;
import com.ag.domain.repository.ArticleRepository;
import com.ag.domain.repository.LikeRepository;
import com.ag.domain.repository.UserRepository;
import com.ag.domain.repository.esQuery.ArticleQueryHandler;
import com.ag.domain.repository.esQuery.LikeQueryHandler;
import com.ag.domain.util.AuthUtil;
import com.ag.domain.util.PojoFiledUtil;
import com.ag.domain.util.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ForumService {
    private final ArticleQueryHandler articleQueryHandler;
    private final LikeQueryHandler likeQueryHandler;
    private final ArticleRepository articleRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;

    public static final int MAX_QUERY_FORUM_SIZE = 10;
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

    public ForumDTO getByPage(String articleId, int page) {
        validateArticleId(articleId);
        validatePage(page);
        ArticleNoPage articleNoPage = new ArticleNoPage(page);

        return get(articleId, articleNoPage.getStart(), articleNoPage.getEnd());
    }

    public List<ForumDTO> get(List<String> articleIdList, int no) {
        validateArticleIdList(articleIdList);

        return articleIdList.stream()
                .map(articleId -> get(articleId, no))
                .collect(Collectors.toList());
    }

    public ForumDTO get(String articleId, int no) {
        return get(articleId, no, no);
    }

    private ForumDTO get(String articleId, int noGte, int noLte) {
        validateArticleId(articleId);

        ArticleStatus status = getFirstArticleStatus(articleId);
        switch (status) {
            case NORMAL:
                ForumDTO forumDTO = new ForumDTO(articleId, ArticleStatus.NORMAL);
                forumDTO.setCount(articleRepository.countByArticleId(articleId));
                if (forumDTO.getCount() <= noGte) {
                    forumDTO.setArticles(Collections.emptyList());
                } else if (noGte == noLte) {
                    forumDTO.setArticles(articleRepository.findById(new Article(articleId, noGte).getId())
                            .map(this::prepareArticle)
                            .map(Collections::singletonList)
                            .orElse(Collections.emptyList()));
                } else {
                    forumDTO.setArticles(articleQueryHandler.searchByArticleIdAndNo(articleId, noGte, noLte)
                            .stream()
                            .map(this::prepareArticle)
                            .collect(Collectors.toList()));
                }
                return forumDTO;
            case DELETED, UNKNOWN:
            default:
                return new ForumDTO(articleId, status);
        }
    }

    public ArticleDTO prepareArticle(Article article) {
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
                .orElse(new ForumUser.AnonymousUserBuilder(result.getAuthorId()).build());
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

    void validateArticleIdList(List<String> articleIdList) {
        ValidationUtil.assertTrue(articleIdList.size() <= MAX_QUERY_FORUM_SIZE, "Article id list length must < {}", MAX_QUERY_FORUM_SIZE);
    }

    void validateArticleId(String articleId) {
        ValidationUtil.assertUUID(articleId, "Article id is not a UUID");
    }

    void validatePage(int page) {
        ValidationUtil.assertInRange(page, 0, null, "Page must >= 0");
    }

}