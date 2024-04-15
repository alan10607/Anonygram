package com.alan10607.ag.controller.forum;

import com.alan10607.ag.dto.ArticleDTO;
import com.alan10607.ag.dto.ContentDTO;
import com.alan10607.ag.dto.ForumDTO;
import com.alan10607.ag.exception.AnonygramIllegalStateException;
import com.alan10607.ag.service.forum.ForumReadService;
import com.alan10607.ag.service.forum.ForumWriteService;
import com.alan10607.ag.service.forum.ImgurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping(path = "/forum")
@AllArgsConstructor
@Tag(name = "Anonygram Forum")
public class ForumController {
    private final ForumReadService forumReadService;
    private final ForumWriteService forumWriteService;
    private final ImgurService imgurService;

    @GetMapping("/id")
    @Operation(summary = "Get all ids of article")
    public List<String> getId(){
        return forumReadService.getId();
    }

    @GetMapping("/article/{idList}/{noList}")
    @Operation(summary = "Get articles and contents in matrix")
    public List<ArticleDTO> getArticleWithContent(@PathVariable("idList") List<String> idList,
                                                  @PathVariable("noList") List<Integer> noList){
        validListSize("idList", idList, 0, 10);
        validListSize("noList", noList, 0, 10);
        return forumReadService.getArticleWithContent(idList, noList);
    }

    @PostMapping("/article")
    @Operation(summary = "Create a article with first content")
    public ArticleDTO createArticleWithContent(@RequestBody @Validated(ForumDTO.CreateArticleGroup.class) ForumDTO forumDTO){
        ContentDTO contentDTO = new ContentDTO(forumDTO.getWord());
        ArticleDTO articleDTO = new ArticleDTO(forumDTO.getTitle(), Collections.singletonList(contentDTO));
        String id = forumWriteService.createArticleWithContent(articleDTO);
        return forumReadService.getArticleWithContent(id, 0);
    }

    @PostMapping("/article/{id}")
    @Operation(summary = "Create a content under article")
    public ArticleDTO createContent(@PathVariable("id") String id,
                                    @RequestBody @Validated(ForumDTO.ReplyForumGroup.class) ForumDTO forumDTO){
        ContentDTO contentDTO = new ContentDTO(id, forumDTO.getWord());
        int no = forumWriteService.createContent(contentDTO);
        return forumReadService.getArticleWithContent(id, no);
    }

    @DeleteMapping("/article/{id}/{no}")
    @Operation(summary = "Delete a content. If delete first content, will also delete its article")
    public void deleteContent(@PathVariable("id") String id,
                              @PathVariable("no") int no){
        forumWriteService.deleteContent(id, no);
    }

    @PatchMapping("/article/{id}/{no}/like")
    @Operation(summary = "To like a content")
    public void updateContentLike(@PathVariable("id") String id,
                                  @PathVariable("no") int no,
                                  @RequestBody @Validated(ForumDTO.LikeContentGroup.class) ForumDTO forumDTO){
        forumWriteService.updateContentLike(id, no, forumDTO.getLike());
    }

    @PostMapping("/image")
    @Operation(summary = "Upload a image in base64 format")
    public ForumDTO createImage(@RequestBody @Validated(ForumDTO.UploadImageGroup.class) ForumDTO forumDTO){
        String imageUrl = imgurService.upload(forumDTO.getImageBase64());
        forumDTO.setImageUrl(imageUrl);
        forumDTO.setImageBase64(null);//to reduce payload size
        return forumDTO;
    }

    private <T> void validListSize(String fieldName, List<T> list, int min, int max){
        if(list.size() < min || list.size() > max){
            throw new AnonygramIllegalStateException(
                    String.format("%s size must be in %s ~ %s", fieldName, min, max));
        }
    }

}