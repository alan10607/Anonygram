package com.ag.domain.repository;

import com.ag.domain.model.Like;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface LikeRepository extends ElasticsearchRepository<Like, String> {
}