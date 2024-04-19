package com.ag.domain.controller;

import com.ag.domain.dto.ForumDTO;
import com.ag.domain.service.ForumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Tag(name = "Forum")
@RequestMapping()
public class ForumController {
    private final ForumService forumService;

    @GetMapping("/forum/{articleId}")
    @Operation(summary = "Get composite article with page")
    @ResponseStatus(HttpStatus.OK)
    public ForumDTO get(@PathVariable("articleId") String articleId,
                        @RequestParam("page") Integer page) {
        return forumService.getByPage(articleId, page);
    }

    @GetMapping("/forum/{articleId}/{no}")
    @Operation(summary = "Get composite articles")
    @ResponseStatus(HttpStatus.OK)
    public ForumDTO get(@PathVariable("articleId") String articleId,
                        @PathVariable("no") int no) {
        return forumService.get(articleId, no);
    }

    @GetMapping("/forums/{articleIdList}")
    @Operation(summary = "Get composite articles")
    @ResponseStatus(HttpStatus.OK)
    public List<ForumDTO> get(@PathVariable("articleIdList") List<String> articleIdList) {
        return forumService.get(articleIdList, 0);
    }

}