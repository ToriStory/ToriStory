package com.gateway.exception.handler;

import com.gateway.exception.AuthException;
import com.gateway.response.EnvelopRes;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthException.class)
    protected ResponseEntity<EnvelopRes<String>> handleAuthException(AuthException e) {
        log.error("handleAuthException {}", e.getErrorCode().getMessage());
        return ResponseEntity.status(e.getErrorCode().getCode()).body(
                EnvelopRes.<String>builder()
                        .code(e.getErrorCode().getCode())
                        .message(e.getMessage())
                        .data(e.getErrorCode().getMessage())
                        .build()
        );
    }

}
