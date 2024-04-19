package com.ag.domain.service;

import com.ag.domain.exception.AgValidationException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import static com.ag.domain.TestUtil.generateRandomString;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
@Slf4j
class QueryServiceTest {

    @InjectMocks
    private QueryService queryService;


    @Test
    void validateKeyword_should_succeed_because_keyword_length_is_within_max_limit() {
        assertDoesNotThrow(() -> queryService.validateKeyword(generateRandomString(QueryService.MAX_KEYWORD_LENGTH)));
    }

    @Test
    void validateKeyword_should_failed_because_word_length_exceeds_max_limit() {
        assertThrows(AgValidationException.class, () -> queryService.validateKeyword(generateRandomString(QueryService.MAX_KEYWORD_LENGTH + 1)));
    }

}