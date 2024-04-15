package com.ag.domain.exception;

import com.ag.domain.exception.base.AnonygramRuntimeException;
import com.ag.domain.model.Article;

public class AgValidationException extends AnonygramRuntimeException {

    public AgValidationException(Throwable cause) {
        super(cause);
    }

    public AgValidationException(String format, Object... args) {
        super(format, args);
    }

    public AgValidationException(String message, Article article, Object... args) {
        super("Article [{}/{}]: " + message, article.getArticleId(), article.getNo(), args);
    }
}
