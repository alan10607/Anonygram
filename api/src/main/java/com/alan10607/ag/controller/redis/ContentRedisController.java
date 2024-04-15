package com.alan10607.ag.controller.redis;

import com.alan10607.ag.dto.SimpleDTO;
import com.alan10607.ag.dto.ContentDTO;
import com.alan10607.ag.service.redis.ContentRedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/redis/content")
@AllArgsConstructor
@Tag(name = "Redis Control")
public class ContentRedisController {
    private final ContentRedisService contentRedisService;

    @GetMapping("/{id}/{no}")
    @Operation(summary = "Get a content from Redis")
    public ContentDTO get(@PathVariable("id") String id,
                          @PathVariable("no") int no) {
        return contentRedisService.get(id, no);
    }

    @PostMapping
    @Operation(summary = "Save a content to Redis")
    public void set(@RequestBody @Valid ContentDTO contentDTO){
        contentRedisService.set(contentDTO);
    }

    @PatchMapping("/{id}/{no}/expire")
    @Operation(summary = "Reset a content Redis expiration")
    public void expire(@PathVariable("id") String id,
                       @PathVariable("no") int no){
        contentRedisService.expire(id, no);
    }

    @PatchMapping("/{id}/{no}/likes")
    @Operation(summary = "Increase likes of content from Redis")
    public void updateLikes(@PathVariable("id") String id,
                       @PathVariable("no") int no,
                       @RequestBody @Validated(SimpleDTO.IntegerGroup.class) SimpleDTO simpleDTO){
        contentRedisService.updateLikes(id, no, simpleDTO.getInteger());
    }

    @DeleteMapping("/{id}/{no}")
    @Operation(summary = "Delete a content from Redis")
    public void delete(@PathVariable("id") String id,
                       @PathVariable("no") int no) {
        contentRedisService.delete(id, no);
    }


}