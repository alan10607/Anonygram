package com.ag.domain.advice;

import com.ag.domain.exception.AgValidationException;
import com.ag.domain.exception.EntityNotFoundException;
import com.ag.domain.exception.LockNotGotException;
import com.ag.domain.exception.base.AnonygramRuntimeException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@AllArgsConstructor
@Slf4j
public class RestExceptionAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return true; // To prevent re-wrap
    }

    @Override
    public Object beforeBodyWrite(Object body,
                                  MethodParameter returnType,
                                  MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request, ServerHttpResponse response) {
        return body;
    }

    private Map<String, String> toErrorMap(Throwable throwable) {
        return toErrorMap(throwable.getMessage());
    }

    private Map<String, String> toErrorMap(String message) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("error", message);
        return errorMap;
    }

    @ExceptionHandler(value = {Throwable.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handle(Throwable e) {
        log.error("Handle internal error", e);
        return toErrorMap("Internal server error");
    }

    @ExceptionHandler(value = {AnonygramRuntimeException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handle(AnonygramRuntimeException e) {
        log.error("{}", e.getMessage());
        return toErrorMap(e);
    }

    @ExceptionHandler(value = {AccessDeniedException.class})
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public Map<String, String> handle(AccessDeniedException e) {
        log.error("{}", e.getMessage());
        return toErrorMap(e);
    }

    @ExceptionHandler(value = {HttpRequestMethodNotSupportedException.class})
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public Map<String, String> handle(HttpRequestMethodNotSupportedException e) {
        return toErrorMap(e);
    }

    @ExceptionHandler(value = {AgValidationException.class})
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public Map<String, String> handle(AgValidationException e) {
        return toErrorMap(e);
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public Map<String, String> handle(MethodArgumentNotValidException e) {
        Map<String, String> suggestions = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error ->
                suggestions.put(error.getField(), error.getDefaultMessage())
        );
        return suggestions;
    }

    @ExceptionHandler(value = {LockNotGotException.class})
    @ResponseStatus(HttpStatus.LOCKED)
    public Map<String, String> handle(LockNotGotException e) {
        return toErrorMap(e);
    }


    @ExceptionHandler(value = {EntityNotFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handle(EntityNotFoundException e) {
        return toErrorMap(e);
    }

    @ExceptionHandler(value = {MissingServletRequestParameterException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        return toErrorMap(e);
    }
}