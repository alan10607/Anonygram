package com.ag.domain.controller;

import com.ag.domain.dto.ImageDTO;
import com.ag.domain.service.ImgurService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@Tag(name = "Image")
@RequestMapping(path = "image")
public class ImageController {
    private final ImgurService imgurService;

    @PostMapping()
    @Operation(summary = "Upload image via base64")
    @ResponseStatus(HttpStatus.CREATED)
    public ImageDTO create(@RequestBody ImageDTO imageDTO) {
        imageDTO.setUrl(imgurService.upload(imageDTO.getBase64()));
        imageDTO.setBase64(null);
        return imageDTO;
    }

}