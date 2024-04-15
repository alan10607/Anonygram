package com.alan10607.ag.controller.redis;

import com.alan10607.ag.dto.ArticleDTO;
import com.alan10607.ag.service.redis.ArticleRedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/redis/article")
@AllArgsConstructor
@Tag(name = "Redis Control")
public class ArticleRedisController {
    private final ArticleRedisService articleRedisService;

    @GetMapping("/{id}")
    @Operation(summary = "Get a article from Redis")
    public ArticleDTO get(@PathVariable("id") String id){
        return articleRedisService.get(id);
    }

    @PostMapping
    @Operation(summary = "Save a article to Redis")
    public void set(@RequestBody @Valid ArticleDTO articleDTO){
        articleRedisService.set(articleDTO);
    }

    @PatchMapping("/{id}/expire")
    @Operation(summary = "Reset a article Redis expiration")
    public void expire(@PathVariable("id") String id){
        articleRedisService.expire(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a article from Redis")
    public void delete(@PathVariable("id") String id){
        articleRedisService.delete(id);
    }


}