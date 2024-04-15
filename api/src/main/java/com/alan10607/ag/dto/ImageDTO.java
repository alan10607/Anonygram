package com.alan10607.ag.dto;

import com.alan10607.ag.util.ToolUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotBlank;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageDTO extends BaseDTO {
    private String scope;
    private String userId;
    @NotBlank
    private String imageBase64;
    private String imageUrl;

    public static ImageDTO from(Object data) {
        return ToolUtil.convertValue(data, ImageDTO.class);
    }

}