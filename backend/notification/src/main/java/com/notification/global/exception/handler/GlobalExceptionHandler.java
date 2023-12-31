package com.notification.global.exception.handler;

import java.io.IOException;

import javax.validation.UnexpectedTypeException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.notification.global.exception.NotificationException;
import com.notification.global.response.EnvelopRes;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler({IllegalArgumentException.class, NotificationException.class})
	protected ResponseEntity<EnvelopRes<String>> handleIllegalArgumentException(NotificationException e) {
		log.error("handleIllegalArgumentException:{}", e.getErrorCode().getMessage());
		return ResponseEntity.status(e.getErrorCode().getCode()).body(
			EnvelopRes.<String>builder()
				.code(e.getErrorCode().getCode())
				.message(e.getMessage())
				.data(e.getErrorCode().getMessage())
				.build()
		);
	}

	/**
	 *  javax.validation.Valid or @Validated 으로 binding error 발생시 발생한다.
	 *  HttpMessageConverter 에서 등록한 HttpMessageConverter binding 못할경우 발생
	 *  주로 @RequestBody, @RequestPart 어노테이션에서 발생
	 */
	@ExceptionHandler({MethodArgumentNotValidException.class, UnexpectedTypeException.class})
	protected ResponseEntity<EnvelopRes<String>> handleValidationException(Exception e) {
		log.error("handleIllegalArgumentException:{}", e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
			EnvelopRes.<String>builder()
				.code(HttpStatus.BAD_REQUEST.value())
				.message(e.getMessage())
				.data(e.getMessage())
				.build()
		);
	}

	@ExceptionHandler({IOException.class, JsonProcessingException.class})
	protected ResponseEntity<EnvelopRes<String>> handleSIOException(IOException e){
		log.error("IOException", e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
			EnvelopRes.<String>builder()
				.code(HttpStatus.INTERNAL_SERVER_ERROR.value())
				.message(e.getMessage())
				.build()
		);
	}

	@ExceptionHandler(Exception.class)
	protected ResponseEntity<EnvelopRes<String>> handleException(Exception e) {
		log.error("handleException", e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
			EnvelopRes.<String>builder()
				.code(HttpStatus.INTERNAL_SERVER_ERROR.value())
				.message(e.getMessage())
				.build()
		);
	}

}

