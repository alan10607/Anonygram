package com.alan10607.ag.controller.redis;

import com.alan10607.ag.dto.SimpleDTO;
import com.alan10607.ag.service.redis.IdRedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/redis")
@AllArgsConstructor
@Tag(name = "Redis Control")
public class IdRedisController {
    private final IdRedisService idRedisService;

    @GetMapping("/id")
    @Operation(summary = "Get all ids from Redis")
    public List<String> get(){
        return idRedisService.get();
    }

    @PostMapping("/id")
    @Operation(summary = "Save a id to Redis. If it is exist then move to top of the list")
    public void set(@RequestBody @Validated({ SimpleDTO.StringGroup.class }) SimpleDTO simpleDTO){
        idRedisService.set(simpleDTO.getString());
    }

    @PostMapping("/ids")
    @Operation(summary = "Save some ids to Redis")
    public void setAll(@RequestBody @Validated({ SimpleDTO.ListGroup.class }) SimpleDTO simpleDTO){
        idRedisService.set((List<String>) simpleDTO.getList());
    }


}