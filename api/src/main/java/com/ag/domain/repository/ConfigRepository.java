package com.ag.domain.repository;

import com.ag.domain.model.base.ConfigEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ConfigRepository<C extends ConfigEntity> extends ElasticsearchRepository<C, String> {
}