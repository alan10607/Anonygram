package com.ag.domain.service;

import com.ag.domain.TestUtil;
import com.ag.domain.dto.ArticleDTO;
import com.ag.domain.dto.QueryDTO;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.model.Article;
import com.ag.domain.model.ForumUser;
import com.ag.domain.model.Like;
import com.ag.domain.repository.ArticleRepository;
import com.ag.domain.repository.LikeRepository;
import com.ag.domain.repository.UserRepository;
import com.ag.domain.repository.esQuery.ArticleQueryHandler;
import com.ag.domain.repository.esQuery.LikeQueryHandler;
import com.ag.domain.util.AuthUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;
import java.util.stream.Collectors;

import static com.ag.domain.TestUtil.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
@Slf4j
class QueryServiceTest {

    @InjectMocks
    private QueryService queryService;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private  LikeRepository likeRepository;

    @Mock
    private  UserRepository userRepository;

    @Mock
    private ArticleQueryHandler articleQueryHandler;

    @Mock
    private LikeQueryHandler likeQueryHandler;

    private static MockedStatic<AuthUtil> mockedAuthUtil;

    @BeforeAll
    public static void setup() {
        mockedAuthUtil = mockStatic(AuthUtil.class);
    }

    @AfterAll
    public static void tearDown() {
        mockedAuthUtil.close();
    }

    @Test
    void queryArticle() {
        // Arrange
        List<Article> articleList = generateArticleList(10);
        Map<String, ForumUser> authorMap = articleList.stream()
                .map(Article::getAuthorId)
                .map(TestUtil::generateUser)
                .peek(author -> author.setHeadUrl("https://test.headurl.com"))
                .collect(Collectors.toMap(ForumUser::getId, author -> author));
        String articleId = articleList.get(0).getArticleId();
        long mockLikeCount = 100L;
        Optional<Like> mockLike = Optional.empty();
        when(articleRepository.findById(articleList.get(0).getId())).thenReturn(Optional.of(articleList.get(0)));
        when(articleRepository.countByArticleId(articleId)).thenReturn(articleList.size());
        when(articleQueryHandler.searchByArticleIdAndNo(eq(articleId), anyInt(), anyInt())).thenReturn(articleList);
        when(userRepository.findById(anyString())).thenAnswer(invocation -> Optional.of(authorMap.get(invocation.getArgument(0))));
        when(likeRepository.findById(anyString())).thenReturn(mockLike);
        when(likeQueryHandler.countByArticleIdAndNo(eq(articleId), anyInt())).thenReturn(mockLikeCount);
        when(AuthUtil.getUserId()).thenReturn(UUID.randomUUID().toString());

        // Act
        QueryDTO queryDTO = queryService.queryArticle(articleId, 1);
        log.info("Query result: " + queryDTO);

        // Assert
        assertEquals(articleId, queryDTO.getArticleId());
        assertEquals(articleList.get(0).getStatus(), queryDTO.getStatus());
        assertEquals(articleList.size(), queryDTO.getCount());
        for(ArticleDTO articleDTO : queryDTO.getArticleList()){
            assertEquals(articleId, articleDTO.getArticleId());
            ForumUser expectAuthor = authorMap.get(articleDTO.getAuthorId());
            assertEquals(expectAuthor.getUsername(), articleDTO.getAuthorName());
            assertEquals(expectAuthor.getHeadUrl(), articleDTO.getAuthorHeadUrl());
            assertEquals(mockLike.isPresent(), articleDTO.getLike());
            assertEquals(mockLikeCount, articleDTO.getLikeCount());
        }
    }

    @Test
    void validateArticleId_should_success_because_is_uuid() {
        assertDoesNotThrow(() -> queryService.validateArticleId(UUID.randomUUID().toString()));
    }

    @Test
    void validateArticleId_should_failed_because_not_uuid() {
        assertThrows(AgValidationException.class, () -> queryService.validateArticleId("1234"));
    }

    @Test
    void validateArticleIdList_should_success_with_uuid_and_within_max_length() {
        // Arrange
        List<String> articleIdList = new ArrayList<>();
        for (int i = 0; i < QueryService.MAX_QUERY_ARTICLE_SIZE; ++i) {
            articleIdList.add(UUID.randomUUID().toString());
        }

        // Act & Assert
        assertDoesNotThrow(() -> queryService.validateArticleIdList(articleIdList));
    }

    @Test
    void validateArticleIdList_should_failed_because_exceed_max_length() {
        // Arrange
        List<String> articleIdList = new ArrayList<>();
        for (int i = 0; i < QueryService.MAX_QUERY_ARTICLE_SIZE + 1; ++i) {
            articleIdList.add(UUID.randomUUID().toString());
        }

        // Act & Assert
        assertThrows(AgValidationException.class, () -> queryService.validateArticleIdList(articleIdList));
    }

    @Test
    void validateArticleIdList_should_failed_because_not_uuid() {
        // Arrange
        List<String> articleIdList = new ArrayList<>();
        for (int i = 0; i < QueryService.MAX_QUERY_ARTICLE_SIZE - 1; ++i) {
            articleIdList.add(UUID.randomUUID().toString());
        }
        articleIdList.add("1234");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> queryService.validateArticleIdList(articleIdList));
    }

    @Test
    void validatePage_should_success_because_more_than_zero() {
        assertDoesNotThrow(() -> queryService.validatePage(5));
        assertDoesNotThrow(() -> queryService.validatePage(0));
    }

    @Test
    void validatePage_should_failed_because_page_is_negative() {
        assertThrows(AgValidationException.class, () -> queryService.validatePage(-1));
    }
    @Test
    void validateKeyword_should_succeed_because_keyword_length_is_within_max_limit() {
        assertDoesNotThrow(() -> queryService.validateKeyword(generateRandomString(QueryService.MAX_KEYWORD_LENGTH)));
    }

    @Test
    void validateKeyword_should_failed_because_word_length_exceeds_max_limit() {
        assertThrows(AgValidationException.class, () -> queryService.validateKeyword(generateRandomString(QueryService.MAX_KEYWORD_LENGTH + 1)));
    }

}