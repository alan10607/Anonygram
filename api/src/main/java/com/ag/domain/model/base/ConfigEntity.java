package com.ag.domain.model.base;

import com.ag.domain.model.ImgurConfig;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.AccessType;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "config")
public abstract class ConfigEntity {

    @Id
    @AccessType(AccessType.Type.PROPERTY)
    public String getId() {
        return this.getType().id;
    }

    public void setId(String ignored) {
        // Ignored setter
    }

    public abstract Type getType();

    @AllArgsConstructor
    public enum Type {
        IMGUR("imgur", ImgurConfig.class);

        public final String id;
        public final Class<?> clazz;
    }

}