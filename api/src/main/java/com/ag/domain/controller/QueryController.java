package com.ag.domain.controller;

import com.ag.domain.dto.ArticleDTO;
import com.ag.domain.dto.QueryDTO;
import com.ag.domain.dto.UserDTO;
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

    @GetMapping("/articleIds")
    @Operation(summary = "Query latest article ids")
    @ResponseStatus(HttpStatus.OK)
    public List<String> queryArticleIds() {
        return queryService.queryArticleIds();
    }

    @GetMapping("/articles/{articleIdList}")
    @Operation(summary = "Query multi first article")
    @ResponseStatus(HttpStatus.OK)
    public List<QueryDTO> queryMultiArticle(@PathVariable("articleIdList") List<String> articleIdList) {
        return queryService.queryMultiArticle(articleIdList, 0);
    }

    @GetMapping("/article/{articleId}")
    @Operation(summary = "Query article with page")
    @ResponseStatus(HttpStatus.OK)
    public QueryDTO queryArticle(@PathVariable("articleId") String articleId,
                                 @RequestParam("page") int page) {
        return queryService.queryArticle(articleId, page);
    }

    @GetMapping("/article")
    @Operation(summary = "Query article by searching the keyword in word or title")
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