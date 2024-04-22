package com.ag.domain.service;

import com.ag.domain.constant.ArticleStatus;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.model.Article;
import com.ag.domain.repository.ArticleRepository;
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

import static com.ag.domain.TestUtil.*;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
class ArticleServiceTest {

    @InjectMocks
    private ArticleService articleService;

    @Mock
    private ArticleRepository articleRepository;

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
        Article article = generateArticle(UUID.randomUUID().toString(), 0);

        // Act & Assert
        assertDoesNotThrow(() -> articleService.validateArticleId(article));
    }

    @Test
    void validateArticleId_should_failed_because_not_uuid() {
        // Arrange
        Article article = generateArticle("1234", 0);

        // Act & Assert
        assertThrows(AgValidationException.class, () -> articleService.validateArticleId(article));
    }

    @Test
    void validateNo_should_success_because_no_is_greater_than_or_equal_to_zero() {
        // Arrange
        Article article = generateArticle(UUID.randomUUID().toString(), 0);

        // Act & Assert
        assertDoesNotThrow(() -> articleService.validateNo(article));
    }

    @Test
    void validateNo_should_failed_because_no_is_less_than_zero() {
        // Arrange
        Article article = generateArticle(UUID.randomUUID().toString(), -1);

        // Act & Assert
        assertThrows(AgValidationException.class, () -> articleService.validateNo(article));
    }

    @Test
    void validateFirstArticleStatusIsNormal_should_succeed_because_status_is_normal() {
        // Arrange
        Article article = generateArticle();
        article.setStatus(ArticleStatus.NORMAL);
        when(articleRepository.findById(article.getId())).thenReturn(Optional.of(article));

        // Act & Assert
        assertDoesNotThrow(() -> articleService.validateFirstArticleStatusIsNormal(article));
    }

    @Test
    void validateFirstArticleStatusIsNormal_should_failed_because_status_is_not_normal() {
        // Arrange
        Article article = generateArticle();
        article.setStatus(ArticleStatus.DELETED);
        when(articleRepository.findById(article.getId())).thenReturn(Optional.of(article));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> articleService.validateFirstArticleStatusIsNormal(article));
    }

    @Test
    void validateWord_should_succeed_because_word_length_is_within_max_limit() {
        // Arrange
        Article article = generateArticle();
        article.setWord(generateRandomString(ArticleService.MAX_WORD_LENGTH));

        // Act & Assert
        assertDoesNotThrow(() -> articleService.validateWord(article));
    }

    @Test
    void validateWord_should_failed_because_word_length_exceeds_max_limit() {
        // Arrange
        Article article = generateArticle();
        article.setWord(generateRandomString(ArticleService.MAX_WORD_LENGTH + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> articleService.validateWord(article));
    }

    @Test
    void validateTitle_should_succeed_because_is_first_article_and_title_length_is_within_max_limit() {
        // Arrange
        Article article = generateArticle();
        article.setCreatingFirstArticle();
        article.setTitle(generateRandomString(ArticleService.MAX_TITLE_LENGTH));

        // Act & Assert
        assertDoesNotThrow(() -> articleService.validateTitle(article));
    }

    @Test
    void validateTitle_should_failed_because_is_first_article_and_title_length_exceeds_max_limit() {
        // Arrange
        Article article = generateArticle();
        article.setCreatingFirstArticle();
        article.setTitle(generateRandomString(ArticleService.MAX_TITLE_LENGTH + 1));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> articleService.validateTitle(article));
    }

    @Test
    void validateTitle_should_succeed_because_is_replying_article_and_title_is_null() {
        // Arrange
        Article article = generateArticle();
        article.setCreatingReplyArticle(UUID.randomUUID().toString());
        article.setTitle(null);

        // Act & Assert
        assertDoesNotThrow(() -> articleService.validateTitle(article));
    }

    @Test
    void validateTitle_should_failed_because_is_replying_article_and_title_is_not_null() {
        // Arrange
        Article article = generateArticle();
        article.setCreatingReplyArticle(UUID.randomUUID().toString());
        article.setTitle("have title");

        // Act & Assert
        assertThrows(AgValidationException.class, () -> articleService.validateTitle(article));
    }

    @Test
    void validateHavePermission_should_succeed_because_user_is_author() {
        // Arrange
        Article article = generateArticle();
        when(AuthUtil.getUser()).thenReturn(generateUser(article.getAuthorId()));

        // Act & Assert
        assertDoesNotThrow(() -> articleService.validateHavePermission(article));
    }

    @Test
    void validateHavePermission_should_failed_because_user_is_not_author() {
        // Arrange
        Article article = generateArticle();
        when(AuthUtil.getUser()).thenReturn(generateUser(UUID.randomUUID().toString()));

        // Act & Assert
        assertThrows(AgValidationException.class, () -> articleService.validateHavePermission(article));
    }

}