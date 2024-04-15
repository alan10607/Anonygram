package com.alan10607.ag.dao;

import com.alan10607.ag.model.TxnParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TxnParamDAO extends JpaRepository<TxnParam, String> {
}