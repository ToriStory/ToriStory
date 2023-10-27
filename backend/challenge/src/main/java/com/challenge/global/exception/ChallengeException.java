package com.challenge.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChallengeException extends RuntimeException {

	private final ErrorCode errorCode;

}
