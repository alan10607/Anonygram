package com.ag.domain.model;

import com.ag.domain.model.base.ConfigEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ImgurConfig extends ConfigEntity {

    @Override
    public Type getType() {
        return Type.IMGUR;
    }

    @Field(type = FieldType.Text)
    private String authorizeUrl;

    @Field(type = FieldType.Text)
    private String tokenUrl;

    @Field(type = FieldType.Text)
    private String uploadUrl;

    @Field(type = FieldType.Text)
    private String clientId;

    @Field(type = FieldType.Text)
    private String clientSecret;

    @Field(type = FieldType.Text)
    private String albumId;

    @Field(type = FieldType.Text)
    private String accessToken;

    @Field(type = FieldType.Text)
    private String refreshToken;

    public boolean isAllConfigNotBlank() {
        return isDefaultConfigNotBlank()
                && StringUtils.isNotBlank(this.accessToken)
                && StringUtils.isNotBlank(this.refreshToken);
    }

    public boolean isDefaultConfigNotBlank() {
        return StringUtils.isNotBlank(this.authorizeUrl)
                && StringUtils.isNotBlank(this.tokenUrl)
                && StringUtils.isNotBlank(this.uploadUrl)
                && StringUtils.isNotBlank(this.clientId)
                && StringUtils.isNotBlank(this.clientSecret)
                && StringUtils.isNotBlank(this.albumId);
    }

}