package com.ag.domain.controller;

import com.ag.domain.dto.ArticleDTO;
import com.ag.domain.dto.UserDTO;
import com.ag.domain.service.ArticleIdService;
import com.ag.domain.service.QueryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Tag(name = "Query")
@RequestMapping(path = "query")
public class QueryController {
    private final QueryService queryService;
    private final ArticleIdService articleIdService;

    @GetMapping("/articleIds")
    @Operation(summary = "Query latest article ids")
    @ResponseStatus(HttpStatus.OK)
    public List<String> queryArticleIds() {
        return articleIdService.get();
    }

    @GetMapping("/article")
    @Operation(summary = "Query first article by searching the keyword in word or title")
    @ResponseStatus(HttpStatus.OK)
    public List<ArticleDTO> queryArticle(@RequestParam("query") String keyword) {
        return queryService.queryArticle(keyword);
    }

    @GetMapping("/user")
    @Operation(summary = "Query user by searching the keyword in username")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDTO> queryUser(@RequestParam("query") String keyword) {
        return queryService.queryUser(keyword);
    }

}