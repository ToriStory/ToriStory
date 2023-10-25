package com.challenge.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	// 자유 도전 에러
	CONTENT_LENGTH_OVER(400, "자유 도전 과제 글자수 초과"),
	CUSTOM_CHALLENGE_NOT_SAVED(404, "자유 도전 과제 등록 오류"),
	RANDOM_CHALLENGE_NOT_FOUND(401, "존재하지 않는 랜덤 도전 과제"),
	CATEGORY_NOT_FOUND(401, "존재하지 않는 인증 방식"),
	CUSTOM_CHALLENGE_NOT_FOUND(404, "존재하지 않은 자유 도전 과제"),

	;

	private final int code;
	private final String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
