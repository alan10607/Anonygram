package com.alan10607.ag.dao;

import com.alan10607.ag.model.ContLike;
import com.alan10607.ag.model.ContLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContLikeDAO extends JpaRepository<ContLike, ContLikeId> {
    ContLike findByIdAndNoAndUserId(String id, int no, String userId);
    boolean existsByIdAndNoAndUserId(String id, int no, String userId);

}
