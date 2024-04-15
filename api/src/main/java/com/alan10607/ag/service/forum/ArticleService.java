package com.alan10607.ag.service.forum;

import com.alan10607.ag.constant.StatusType;
import com.alan10607.ag.dao.ArticleDAO;
import com.alan10607.ag.dto.ArticleDTO;
import com.alan10607.ag.exception.AnonygramIllegalStateException;
import com.alan10607.ag.model.Article;
import com.alan10607.ag.service.redis.ArticleRedisService;
import com.alan10607.ag.service.redis.lock.ForumLockService;
import com.alan10607.ag.util.TimeUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class ArticleService {
    private final ContentService contentService;
    private final ArticleRedisService articleRedisService;
    private final ForumLockService forumLockService;
    private final ArticleDAO articleDAO;

    public ArticleDTO get(String id) {
        ArticleDTO articleDTO = articleRedisService.get(id);
        if(StringUtils.isBlank(articleDTO.getId())){
            forumLockService.lockByArticle(id, () -> pullToRedis(id));
            articleDTO = articleRedisService.get(id);
        }
        articleRedisService.expire(id);

        return articleFilter(articleDTO);
    }

    private void pullToRedis(String id) {
        ArticleDTO articleDTO = articleDAO.findById(id)
            .map(article -> new ArticleDTO(article.getId(),
                article.getTitle(),
                article.getStatus(),
                article.getCreateDate(),
                article.getUpdateDate(),
                contentService.getContentSize(id)))
            .orElseGet(() -> {
                log.error("Pull Article failed, id={}, will put empty data to redis", id);
                return new ArticleDTO(id, StatusType.UNKNOWN);
            });

        articleRedisService.set(articleDTO);
        articleRedisService.expire(id);
        log.info("Pull article to redis succeed, id={}", id);
    }

    private ArticleDTO articleFilter(ArticleDTO articleDTO) {
        switch(articleDTO.getStatus()){
            case NORMAL:
                return articleDTO;
            case DELETED :
                return new ArticleDTO(articleDTO.getId(), StatusType.DELETED);
            case UNKNOWN :
            default:
                log.info("Article not found, id={}", articleDTO.getId());//Cache Penetration, store empty value
                return new ArticleDTO(articleDTO.getId(), StatusType.UNKNOWN);
        }
    }

    public Article create(ArticleDTO articleDTO) {
        Article article = prepareCreateEntity(articleDTO);
        articleDAO.save(article);
        articleRedisService.delete(article.getId());
        return article;
    }

    private Article prepareCreateEntity(ArticleDTO articleDTO){
        LocalDateTime createDate = TimeUtil.now();
        return new Article(UUID.randomUUID().toString(),
                articleDTO.getTitle(),
                StatusType.NORMAL,
                createDate,
                createDate);
    }

    public void update(ArticleDTO articleDTO) {
        Article article = articleDAO.findById(articleDTO.getId()).orElseThrow(() ->
                new AnonygramIllegalStateException("Article not found, id={}", articleDTO.getId()));

        Optional.ofNullable(articleDTO.getStatus()).ifPresent(article::setStatus);
        article.setUpdateDate(TimeUtil.now());

        articleDAO.save(article);
        articleRedisService.delete(articleDTO.getId());
    }

    public void updateStatus(String id, StatusType status) {
        update(new ArticleDTO(id, status));
    }

}