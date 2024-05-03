package com.ag.domain.service;

import com.ag.domain.repository.ArticleRepository;
import com.ag.domain.repository.esQuery.ArticleQueryHandler;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
@Slf4j
public class ArticleIdService {
    private final ArticleRepository articleRepository;
    private final ArticleQueryHandler articleQueryHandler;
    private static final int CACHE_SIZE = 100;
    private final Map<String, String> lruCache = new LinkedHashMap<>(CACHE_SIZE, 0.75f, true) {
        @Override
        protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
            return size() > CACHE_SIZE;
        }
    };

    @PostConstruct
    public void init() {
        if (articleRepository.count() > 0) {
            List<String> articleIds = articleQueryHandler.searchLatestArticleId();
            for (int i = articleIds.size() - 1; i >= 0; --i) {
                lruCache.put(articleIds.get(i), articleIds.get(i));
            }
        }

        log.info("Fetch total {} article ids to cache", lruCache.size());
    }

    public List<String> get() {
        List<String> latestArticleIds = new ArrayList<>(lruCache.values());
        Collections.reverse(latestArticleIds);
        return latestArticleIds;
    }

    public synchronized void push(String articleId) {
        lruCache.put(articleId, articleId);
    }

}
