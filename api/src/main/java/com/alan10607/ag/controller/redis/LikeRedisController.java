package com.alan10607.ag.controller.redis;

import com.alan10607.ag.dto.LikeDTO;
import com.alan10607.ag.service.redis.LikeRedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "/redis/like")
@AllArgsConstructor
@Tag(name = "Redis Control")
public class LikeRedisController {
    private final LikeRedisService likeRedisService;

    @GetMapping("/{id}/{no}/{userId}")
    @Operation(summary = "Get a content like from Redis")
    public Boolean get(@PathVariable("id") String id,
                       @PathVariable("no") int no,
                       @PathVariable("userId") String userId) {
        return likeRedisService.get(id, no, userId);
    }

    @PostMapping()
    @Operation(summary = "Save a content like to Redis")
    public void set(@RequestBody @Valid LikeDTO likeDTO) {
        likeRedisService.set(likeDTO);
    }

    @PatchMapping("/{id}/{no}/{userId}/expire")
    @Operation(summary = "Reset a content like Redis expiration")
    public void expire(@PathVariable("id") String id,
                       @PathVariable("no") int no,
                       @PathVariable("userId") String userId) {
        likeRedisService.expire(id, no, userId);
    }
}