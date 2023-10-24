package com.challenge.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	// 자유 도전 에러
	CONTENT_LENGTH_OVER(400, "자유 도전 과제 글자수 초과"),
	CUSTOM_CHALLENGE_NOT_SAVED(404, "자유 도전 과제 등록 오류"),


	;

	private final int code;
	private final String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
