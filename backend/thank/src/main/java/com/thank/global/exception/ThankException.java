package com.thank.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ThankException extends RuntimeException {

	private final ErrorCode errorCode;

}
