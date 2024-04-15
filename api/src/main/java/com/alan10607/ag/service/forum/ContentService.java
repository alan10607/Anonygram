package com.alan10607.ag.service.forum;

import com.alan10607.ag.constant.StatusType;
import com.alan10607.ag.dao.ArticleDAO;
import com.alan10607.ag.dao.ContentDAO;
import com.alan10607.ag.dto.ContentDTO;
import com.alan10607.ag.dto.LikeDTO;
import com.alan10607.ag.dto.UserDTO;
import com.alan10607.ag.exception.AnonygramIllegalStateException;
import com.alan10607.ag.model.Content;
import com.alan10607.ag.service.auth.UserService;
import com.alan10607.ag.service.redis.ArticleRedisService;
import com.alan10607.ag.service.redis.ContentRedisService;
import com.alan10607.ag.service.redis.lock.ForumLockService;
import com.alan10607.ag.util.AuthUtil;
import com.alan10607.ag.util.TimeUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ContentService {
    private final UserService userService;
    private final IdService idService;
    private final LikeService likeService;
    private final ArticleRedisService articleRedisService;
    private final ContentRedisService contentRedisService;
    private final ForumLockService forumLockService;
    private final ArticleDAO articleDAO;
    private final ContentDAO contentDAO;

    public ContentDTO get(String id, int no) {
        ContentDTO contentDTO = contentRedisService.get(id, no);
        if(StringUtils.isBlank(contentDTO.getId()) || contentDTO.getNo() == null){
            forumLockService.lockByContent(id, no, () -> pullToRedis(id, no));
            contentDTO = contentRedisService.get(id, no);
        }
        contentRedisService.expire(id, no);

        return contentFilter(contentDTO);
    }

    private void pullToRedis(String id, int no) {
        ContentDTO contentDTO = contentDAO.findByIdAndNo(id, no)
            .map(content ->  new ContentDTO(content.getId(),
                        content.getNo(),
                        content.getAuthorId(),
                        content.getWord(),
                        content.getLikes(),
                        content.getStatus(),
                        content.getCreateDate(),
                        content.getUpdateDate()))
            .orElseGet(() -> {
                log.error("Pull Content failed, id={}, no={}, put empty data to redis", id, no);
                return new ContentDTO(id, no, StatusType.UNKNOWN);
            });

        contentRedisService.set(contentDTO);
        contentRedisService.expire(id, no);
        log.info("Pull Content to redis succeed, id={}, no={}", id, no);
    }

    private ContentDTO contentFilter(ContentDTO contentDTO) {
        switch(contentDTO.getStatus()){
            case NORMAL:
                UserDTO userDTO = userService.get(contentDTO.getAuthorId());
                contentDTO.setAuthorName(userDTO.getUsername());
                contentDTO.setAuthorHeadUrl(userDTO.getHeadUrl());
                contentDTO.setLike(likeService.get(contentDTO.getId(), contentDTO.getNo(), AuthUtil.getUserId()));
                return contentDTO;
            case DELETED :
                return new ContentDTO(contentDTO.getId(), contentDTO.getNo(), StatusType.DELETED);
            case UNKNOWN :
            default:
                log.info("Content not found, id={}, no={}", contentDTO.getId(), contentDTO.getNo());
                return new ContentDTO(contentDTO.getId(), contentDTO.getNo(), StatusType.UNKNOWN);
        }
    }

    public Integer getContentSize(String id){
        return contentDAO.countById(id);
    }

    /**
     * MySQL InnoDB engine does not support auto-increment with multiple primary keys.
     * Instead, use countByIdWithLock with "LOCK IN SHARE MODE" as an alternative to the auto-increment rule.
     * countByIdWithLock will only lock the rows with the same id and will not lock other rows with different id.
     * @param contentDTO
     * @return
     */
    public Content create(ContentDTO contentDTO) {
        Content content = prepareCreateEntity(contentDTO);
        contentDAO.save(content);
        contentRedisService.delete(content.getId(), content.getNo());
        articleRedisService.delete(content.getId());
        idService.set(content.getId());
        return content;
    }

    private Content prepareCreateEntity(ContentDTO contentDTO){
        articleDAO.findById(contentDTO.getId()).orElseThrow(() ->
                new AnonygramIllegalStateException("Article not found, id={}", contentDTO.getId()));

        List<Object[]> query = contentDAO.countByIdWithLock(contentDTO.getId());
        int no = ((BigInteger) query.get(0)[0]).intValue();
        LocalDateTime createDate = contentDTO.getCreateDate() == null ? TimeUtil.now() : contentDTO.getCreateDate();

        return new Content(contentDTO.getId(),
                no,
                AuthUtil.getUserId(),
                contentDTO.getWord(),
                0L,
                StatusType.NORMAL,
                createDate,
                createDate);
    }

    public void update(ContentDTO contentDTO) {
        Content content = contentDAO.findByIdAndNo(contentDTO.getId(), contentDTO.getNo()).orElseThrow(() ->
                new AnonygramIllegalStateException("Content not found, id={}, no={}", contentDTO.getId(), contentDTO.getNo()));

        if(!AuthUtil.getUserId().equals(content.getAuthorId()))
            throw new AnonygramIllegalStateException("No authority to modify");

        Optional.ofNullable(contentDTO.getStatus()).ifPresent(content::setStatus);
        content.setUpdateDate(TimeUtil.now());

        contentDAO.save(content);
        contentRedisService.delete(contentDTO.getId(), contentDTO.getNo());
    }

    public void updateStatus(String id, int no, StatusType status) {
        update(new ContentDTO(id, no, status));
    }

    public void updateLike(String id, int no, boolean like) {
        likeService.set(new LikeDTO(id, no, AuthUtil.getUserId(), like));
        contentRedisService.updateLikes(id, no, like ? 1 : -1);
    }
}