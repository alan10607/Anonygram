package com.alan10607.ag.service.forum;

import com.alan10607.ag.constant.StatusType;
import com.alan10607.ag.dto.ArticleDTO;
import com.alan10607.ag.dto.ContentDTO;
import com.alan10607.ag.exception.AnonygramIllegalStateException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ForumReadService {
    private final IdService idService;
    private final ArticleService articleService;
    private final ContentService contentService;

    public List<String> getId(){
        return idService.get();
    }

    public List<ArticleDTO> getArticleWithContent(List<String> idList, List<Integer> noList){
        return idList.stream().map(id -> getArticleWithContent(id, noList)).collect(Collectors.toList());
    }

    public ArticleDTO getArticleWithContent(String id, int no){
        return getArticleWithContent(id, Collections.singletonList(no));
    }

    public ArticleDTO getArticleWithContent(String id, List<Integer> noList){
        ArticleDTO articleDTO = articleService.get(id);
        if(articleDTO.getStatus() == StatusType.NORMAL) {
            articleDTO.setContentList(noList.stream()
                    .map(no -> contentService.get(id, no))
                    .collect(Collectors.toList()));
        }else{
            articleDTO.setContentList(noList.stream()
                    .map(no -> new ContentDTO(id, no, articleDTO.getStatus()))
                    .collect(Collectors.toList()));
        }
        return articleDTO;
    }

    public void checkArticleStatusIsNormal(String id){
        ArticleDTO articleDTO = articleService.get(id);
        if(articleDTO.getStatus() != StatusType.NORMAL){
            throw new AnonygramIllegalStateException("Article status of this content is {} normal, id={}",
                    articleDTO.getStatus(), id);
        }
    }

    public void checkContentStatusIsNormal(String id, int no){
        checkArticleStatusIsNormal(id);
        ContentDTO contentDTO = contentService.get(id, no);
        if(contentDTO.getStatus() != StatusType.NORMAL){
            throw new AnonygramIllegalStateException("Content status is {}, id={}, no={}",
                    contentDTO.getStatus(), id, no);
        }
    }
}