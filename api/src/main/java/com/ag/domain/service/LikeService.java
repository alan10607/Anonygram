package com.ag.domain.service;

import com.ag.domain.advice.ConcurrentSafety;
import com.ag.domain.model.Article;
import com.ag.domain.model.Like;
import com.ag.domain.repository.LikeRepository;
import com.ag.domain.service.base.CrudServiceImpl;
import com.ag.domain.util.AuthUtil;
import com.ag.domain.util.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class LikeService extends CrudServiceImpl<Like> {
    private final ArticleService articleService;
    private final LikeRepository likeRepository;

    public Like get(String articleId, int no) {
        return this.get(new Like(articleId, no));
    }

    @ConcurrentSafety(entity = Like.class)
    public Like create(String articleId, int no) {
        return this.create(new Like(articleId, no));
    }

    @ConcurrentSafety(entity = Like.class)
    public Like delete(String articleId, int no) {
        return this.delete(new Like(articleId, no));
    }

    @Override
    protected Like getImpl(Like like) {
        like.setUserId(AuthUtil.getUserId());
        return likeRepository.findById(like.getId()).orElse(null);
    }

    @Override
    protected Like createImpl(Like like) {
        like.setUserId(AuthUtil.getUserId());
        return likeRepository.save(like);
    }

    @Override
    protected Like updateImpl(Like like) {
        // Ignored update
        return like;
    }

    @Override
    protected Like deleteImpl(Like like) {
        like.setUserId(AuthUtil.getUserId());
        likeRepository.deleteById(like.getId());
        return like;
    }

    @Override
    protected void beforeGet(Like like) {
        validateArticleId(like);
        validateNo(like);
    }

    @Override
    protected void beforeCreate(Like like) {
        validateArticleId(like);
        validateNo(like);
        validateArticleIsExist(like);
        validateLikeIsNotExist(like);
    }

    @Override
    protected void beforeDelete(Like like) {
        validateArticleIsExist(like);
    }

    void validateArticleId(Like like) {
        ValidationUtil.assertUUID(like.getArticleId(), "Article id is not a UUID");
    }

    void validateNo(Like like) {
        ValidationUtil.assertInRange(like.getNo(), 0, null, "No must >= 0");
    }

    void validateLikeIsNotExist(Like like) {
        like.setUserId(AuthUtil.getUserId());
        ValidationUtil.assertTrue(likeRepository.findById(like.getId()).isEmpty(), "Like already exists");
    }

    void validateArticleIsExist(Like like) {
        Article article = articleService.get(like.getArticleId(), like.getNo());
        ValidationUtil.assertTrue(article != null, "Article not found for article id and no");
    }

}
