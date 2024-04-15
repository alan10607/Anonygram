package com.alan10607.ag.dto;

import com.alan10607.ag.util.ToolUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class LikeDTO extends BaseDTO {

    @NotBlank
    private String id;

    @NotNull
    @Min(0)
    private Integer no;

    @NotNull
    private String userId;

    @NotNull
    private Boolean like;

    public LikeDTO(String id,
                   Integer no){
        this.id = id;
        this.no = no;
    }

    public LikeDTO(String id,
                   Integer no,
                   String userId){
        this.id = id;
        this.no = no;
        this.userId = userId;
    }

    public String toLikeNumberString() {
        return this.like ? "1" : "0";
    }

    public String toLikeString() {
        return this.like ? "like" : "dislike";
    }

    public String toMessageString(){
        return String.format("%s:%s:%s:%s", this.id, this.no, this.userId, toLikeNumberString());
    }

    public static LikeDTO fromMessageString(String messageString){
        String[] args = messageString.split(":");
        return new LikeDTO(args[0], Integer.parseInt(args[1]), args[2], "1".equals(args[3]));
    }

    public static LikeDTO from(Object data) {
        return ToolUtil.convertValue(data, LikeDTO.class);
    }


}