package com.ag.domain.controller;

import com.ag.domain.dto.DiscussionDTO;
import com.ag.domain.service.DiscussionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Tag(name = "Discussion")
@RequestMapping()
public class DiscussionController {
    private final DiscussionService discussionService;

    @GetMapping("/discussion/{articleId}")
    @Operation(summary = "Get discussions with page")
    @ResponseStatus(HttpStatus.OK)
    public DiscussionDTO get(@PathVariable("articleId") String articleId,
                             @RequestParam("page") Integer page) {
        return discussionService.getByPage(articleId, page);
    }

    @GetMapping("/discussion/{articleId}/{no}")
    @Operation(summary = "Get a discussion")
    @ResponseStatus(HttpStatus.OK)
    public DiscussionDTO get(@PathVariable("articleId") String articleId,
                             @PathVariable("no") int no) {
        return discussionService.get(articleId, no);
    }

    @GetMapping("/discussions/{articleIdList}")
    @Operation(summary = "Get discussions")
    @ResponseStatus(HttpStatus.OK)
    public List<DiscussionDTO> get(@PathVariable("articleIdList") List<String> articleIdList) {
        return discussionService.get(articleIdList, 0);
    }

}