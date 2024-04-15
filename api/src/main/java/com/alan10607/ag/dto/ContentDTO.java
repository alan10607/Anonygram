package com.alan10607.ag.dto;

import com.alan10607.ag.constant.StatusType;
import com.alan10607.ag.util.ToolUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ContentDTO extends BaseDTO {
    @NotNull
    private String id;

    @NotNull
    @Min(0)
    private Integer no;

    @NotBlank
    private String authorId;

    @NotBlank
    private String word;

    @NotNull
    @Min(0)
    private Long likes;

    @NotNull
    private StatusType status;

    @NotNull
    private LocalDateTime createDate;

    @NotNull
    private LocalDateTime updateDate;

    private Boolean like;
    private String authorName;
    private String authorHeadUrl;

    public ContentDTO(String id,
                   Integer no,
                   String authorId,
                   String word,
                   Long likes,
                   StatusType status,
                   LocalDateTime createDate,
                   LocalDateTime updateDate) {
        this.id = id;
        this.no = no;
        this.authorId = authorId;
        this.word = word;
        this.status = status;
        this.likes = likes;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public ContentDTO(String id,
                      Integer no,
                      StatusType status) {
        this.id = id;
        this.no = no;
        this.status = status;
    }

    public ContentDTO(String word) {
        this.word = word;
    }

    public ContentDTO(String id,
                      String word) {
        this.id = id;
        this.word = word;
    }

    public static ContentDTO from(Object data) {
        return ToolUtil.convertValue(data, ContentDTO.class);
    }


}