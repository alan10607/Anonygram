package com.alan10607.ag.service.forum;

import com.alan10607.ag.constant.StatusType;
import com.alan10607.ag.dao.ContentDAO;
import com.alan10607.ag.service.redis.IdRedisService;
import com.alan10607.ag.service.redis.IdStrRedisService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class IdService  {
    private final ContentDAO contentDAO;
    private final IdRedisService idRedisService;
    private final IdStrRedisService idStrRedisService;

    public List<String> get() {
        if(StringUtils.isBlank(idStrRedisService.get())) {
            pullStringToRedis();
        }

        String idStr = idStrRedisService.get();
        return StringUtils.isBlank(idStr) ? new ArrayList<>() : Arrays.asList(idStr.split(","));
    }

    private void pullStringToRedis() {
        if(idRedisService.get().isEmpty()){
            pullToRedis();
        }
        List<String> idList = idRedisService.get();
        String idStr = String.join(",", idList);
        idStrRedisService.set(idStr);
        log.info("Set idStr to redis succeed, id size={}", idList.size());
    }

    private void pullToRedis() {
        List<String> sortedIdList = contentDAO.findLatest100Id(StatusType.NORMAL.name());
        idRedisService.set(sortedIdList);
        log.info("Set id to redis succeed, id size={}", sortedIdList.size());
    }

    public void set(String id) {
        idRedisService.set(id);
        idStrRedisService.delete();
    }
}