package com.alan10607.ag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestResponseEntity {
    private HttpStatus status;
    private Object result;

    public static RestResponseEntity ok(Object result) {
        return new RestResponseEntity(HttpStatus.OK, result);
    }

    public static RestResponseEntity err(Object result) {
        return new RestResponseEntity(HttpStatus.BAD_REQUEST, result);
    }
}