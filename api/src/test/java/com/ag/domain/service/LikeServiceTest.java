package com.ag.domain.service;

import com.ag.domain.exception.AgValidationException;
import com.ag.domain.model.Article;
import com.ag.domain.model.Like;
import com.ag.domain.repository.LikeRepository;
import com.ag.domain.util.AuthUtil;
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

import java.util.Optional;
import java.util.UUID;

import static com.ag.domain.TestUtil.generateArticle;
import static com.ag.domain.TestUtil.generateLike;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
class LikeServiceTest {
    @InjectMocks
    private LikeService likeService;

    @Mock
    private ArticleService articleService;

    @Mock
    private LikeRepository likeRepository;

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
    void validateArticleId_should_success_because_is_uuid() {
        // Arrange
        Like like = generateLike(UUID.randomUUID().toString(), 0, UUID.randomUUID().toString());

        // Act & Assert
        assertDoesNotThrow(() -> likeService.validateArticleId(like));
    }

    @Test
    void validateArticleId_should_failed_because_not_uuid() {
        // Arrange
        Like like = generateLike("1234", 0, UUID.randomUUID().toString());

        // Act & Assert
        assertThrows(AgValidationException.class, () -> likeService.validateArticleId(like));
    }

    @Test
    void validateNo_should_success_because_no_is_greater_than_or_equal_to_zero() {
        // Arrange
        Like like = generateLike(UUID.randomUUID().toString(), 0, UUID.randomUUID().toString());

        // Act & Assert
        assertDoesNotThrow(() -> likeService.validateNo(like));
    }

    @Test
    void validateNo_should_failed_because_no_is_less_than_zero() {
        // Arrange
        Like like = generateLike(UUID.randomUUID().toString(), -1, UUID.randomUUID().toString());

        // Act & Assert
        assertThrows(AgValidationException.class, () -> likeService.validateNo(like));
    }

    @Test
    void validateLikeIsNotExist_should_success_because_like_not_exist() {
        // Arrange
        Like like = generateLike();
        when(AuthUtil.getUserId()).thenReturn(like.getUserId());
        when(likeRepository.findById(like.getId())).thenReturn(Optional.empty());

        // Act & Assert
        assertDoesNotThrow(() -> likeService.validateLikeIsNotExist(like));
    }

    @Test
    void validateLikeIsNotExist_should_failed_because_like_already_exist() {
        // Arrange
        Like like = generateLike();
        when(AuthUtil.getUserId()).thenReturn(like.getUserId());
        when(likeRepository.findById(like.getId())).thenReturn(Optional.of(like));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> likeService.validateLikeIsNotExist(like));
    }

    @Test
    void validateArticleIsExist_should_success_because_article_exist() {
        // Arrange
        Like like = generateLike();
        Article article = generateArticle(like.getArticleId(), like.getNo());
        when(articleService.get(like.getArticleId(), like.getNo())).thenReturn(article);

        // Act & Assert
        assertDoesNotThrow(() -> likeService.validateArticleIsExist(like));
    }

    @Test
    void validateArticleIsNotExist_should_failed_because_article_not_exist() {
        // Arrange
        Like like = generateLike();
        when(articleService.get(like.getArticleId(), like.getNo())).thenReturn(null);

        // Act & Assert
        assertThrows(AgValidationException.class, () -> likeService.validateArticleIsExist(like));
    }

}