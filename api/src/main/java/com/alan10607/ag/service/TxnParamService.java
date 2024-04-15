package com.alan10607.ag.service;

import com.alan10607.ag.constant.TxnParamKey;
import com.alan10607.ag.dao.TxnParamDAO;
import com.alan10607.ag.model.TxnParam;
import com.alan10607.ag.util.TimeUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class TxnParamService {
    private TxnParamDAO txnParamDAO;

    public String get(TxnParamKey key) {
        return txnParamDAO.findById(key.name())
                .map(TxnParam::getValue)
                .orElseGet(() -> {
                    log.error("Param not found: {}", key);
                    return "";
                });
    }

    public void set(TxnParamKey key, String value) {
        txnParamDAO.save(new TxnParam(key.name(), value, TimeUtil.now()));
    }

    public void delete(TxnParamKey key) {
        txnParamDAO.findById(key.name()).ifPresentOrElse(
                txnParam -> txnParamDAO.delete(txnParam),
                () -> { log.error("Param not found: {}", key); });
    }

}