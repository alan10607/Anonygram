package com.alan10607.ag.controller.redis;

import com.alan10607.ag.dto.SimpleDTO;
import com.alan10607.ag.service.redis.IdStrRedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/redis/idStr")
@AllArgsConstructor
@Tag(name = "Redis Control")
public class IdStrRedisController {
    private final IdStrRedisService idStrRedisService;

    @GetMapping
    @Operation(summary = "Get id string from Redis")
    public SimpleDTO get(){
        SimpleDTO simpleDTO = new SimpleDTO();
        simpleDTO.setString(idStrRedisService.get());
        return simpleDTO;
    }

    @PostMapping
    @Operation(summary = "Save id string to Redis")
    public void set(@RequestBody @Validated({ SimpleDTO.StringGroup.class }) SimpleDTO simpleDTO){
        idStrRedisService.set(simpleDTO.getString());
    }

}