package com.ag.domain.service;

import com.ag.domain.advice.ConcurrentSafety;
import com.ag.domain.constant.ArticleStatus;
import com.ag.domain.exception.EntityNotFoundException;
import com.ag.domain.exception.base.AnonygramRuntimeException;
import com.ag.domain.model.Article;
import com.ag.domain.repository.ArticleRepository;
import com.ag.domain.service.base.CrudServiceImpl;
import com.ag.domain.util.AuthUtil;
import com.ag.domain.util.TimeUtil;
import com.ag.domain.util.ValidationUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class ArticleService extends CrudServiceImpl<Article> {
    private final ArticleRepository articleRepository;
    public static final int MAX_WORD_LENGTH = 5000;
    public static final int MAX_TITLE_LENGTH = 100;

    public Article get(String articleId, int no) {
        return get(new Article(articleId, no));
    }

    @ConcurrentSafety(entity = Article.class)
    public Article delete(String articleId, int no) {
        return delete(new Article(articleId, no));
    }

    @Override
    protected Article getImpl(Article article) {
        Article firstArticle = articleRepository.findById(new Article(article.getArticleId(), 0).getId())
                .filter(a -> a.getStatus() == ArticleStatus.NORMAL)
                .orElse(null);

        if (firstArticle == null) {
            return null;
        }

        if (article.getNo() == 0) {
            return firstArticle;
        }

        return articleRepository.findById(article.getId())
                .filter(a -> a.getStatus() == ArticleStatus.NORMAL)
                .orElse(null);
    }

    @Override
    protected Article createImpl(Article article) {
        LocalDateTime now = TimeUtil.now();
        String articleId;
        int no;
        if (article.isCreatingFirstArticle()) {
            articleId = UUID.randomUUID().toString();
            no = 0;
        } else if (article.isCreatingReplyArticle()) {
            articleId = article.getArticleId();
            no = articleRepository.countByArticleId(article.getArticleId());
        } else {
            throw new AnonygramRuntimeException("Illegal article id and no when creating");
        }

        article = Article.builder()
                .articleId(articleId)
                .no(no)
                .authorId(AuthUtil.getUserId())
                .title(article.getTitle())
                .word(article.getWord())
                .status(ArticleStatus.NORMAL)
                .createdTime(now)
                .updatedTime(now)
                .build();

        return articleRepository.save(article);
    }

    @Override
    protected Article updateImpl(Article article) {
        Article existing = articleRepository.findById(article.getId())
                .orElseThrow(() -> new EntityNotFoundException(Article.class));
        existing.setTitle(article.getTitle());
        existing.setWord(article.getWord());
        existing.setUpdatedTime(TimeUtil.now());
        return articleRepository.save(existing);
    }

    @Override
    protected Article deleteImpl(Article article) {
        Article existing = articleRepository.findById(article.getId())
                .orElseThrow(() -> new EntityNotFoundException(Article.class));
        existing.setStatus(ArticleStatus.DELETED);
        existing.setUpdatedTime(TimeUtil.now());
        return articleRepository.save(existing);
    }

    @Override
    protected void beforeGet(Article article) {
        validateArticleId(article);
        validateNo(article);
    }

    @Override
    protected void beforeCreate(Article article) {
        if (article.isCreatingFirstArticle()) {
            validateTitle(article);
        } else if (article.isCreatingReplyArticle()) {
            validateArticleId(article);
            validateFirstArticleStatusIsNormal(article);
        } else {
            throw new AnonygramRuntimeException("Illegal article id and no when creating");
        }

        validateWord(article);
    }

    @Override
    protected void beforeUpdateAndPatch(Article article) {
        validateTitle(article);
        validateWord(article);
        validateHavePermission(article);
    }

    @Override
    protected void beforeDelete(Article article) {
        validateHavePermission(article);
    }

    void validateArticleId(Article article) {
        ValidationUtil.assertUUID(article.getArticleId(), "Article id is not a UUID");
    }

    void validateNo(Article article) {
        ValidationUtil.assertInRange(article.getNo(), 0, null, "No must >= 0");
    }

    void validateFirstArticleStatusIsNormal(Article article) {
        Article firstArticle = articleRepository.findById(new Article(article.getArticleId(), 0).getId())
                .orElseThrow(() -> new EntityNotFoundException(Article.class));
        ValidationUtil.assertTrue(firstArticle.getStatus() == ArticleStatus.NORMAL, "First article's status is not normal");
    }

    void validateWord(Article article) {//TODO: please update front end
        ValidationUtil.assertInLength(article.getWord(), MAX_WORD_LENGTH, "Word length must in {} bytes and not blank", MAX_WORD_LENGTH);
    }

    void validateTitle(Article article) {
        if (article.isCreatingFirstArticle()) {
            ValidationUtil.assertInLength(article.getTitle(), MAX_TITLE_LENGTH, "Title length must in {} bytes and not blank", MAX_TITLE_LENGTH);
        } else if (article.isCreatingReplyArticle()){
            ValidationUtil.assertTrue(article.getTitle() == null, "Title must null if it is not first article");
        }
    }

    void validateHavePermission(Article article) {
        ValidationUtil.assertHavePermission(article.getAuthorId(), "No permission to update");
    }

}

