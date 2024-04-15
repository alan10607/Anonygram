package com.ag.domain.repository;

import com.ag.domain.model.ForumUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.Optional;

public interface UserRepository extends ElasticsearchRepository<ForumUser, String> {
    Optional<ForumUser> findByEmail(String email);

    Optional<ForumUser> findByUsername(String username);
}