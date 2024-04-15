package com.alan10607.ag.service.forum;

import com.alan10607.ag.constant.StatusType;
import com.alan10607.ag.dto.ArticleDTO;
import com.alan10607.ag.dto.ContentDTO;
import com.alan10607.ag.model.Article;
import com.alan10607.ag.model.Content;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class ForumWriteService {
    private final ArticleService articleService;
    private final ContentService contentService;
    private final ForumReadService forumReadService;

    @Transactional
    public String createArticleWithContent(ArticleDTO articleDTO) {
        Article article = articleService.create(articleDTO);
        ContentDTO contentDTO = articleDTO.getContentList().get(0);
        contentDTO.setId(article.getId());
        contentDTO.setCreateDate(article.getCreateDate());
        contentService.create(contentDTO);
        return article.getId();
    }

    @Transactional
    public int createContent(ContentDTO contentDTO) {
        forumReadService.checkArticleStatusIsNormal(contentDTO.getId());
        Content content = contentService.create(contentDTO);
        return content.getNo();
    }

    @Transactional
    public void deleteContent(String id, int no){
        contentService.updateStatus(id, no,  StatusType.DELETED);
        if(no == 0){
            articleService.updateStatus(id, StatusType.DELETED);
        }
    }

    public void updateContentLike(String id, int no, boolean like) {
        forumReadService.checkContentStatusIsNormal(id, no);
        contentService.updateLike(id, no, like);
    }

}