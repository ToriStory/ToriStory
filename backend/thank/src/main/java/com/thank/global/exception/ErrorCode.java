package com.thank.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	// 감사 일기 에러
	THANK_NOTE_LENGTH_OVER(400, "감사일기 개수 초과"),
	THANK_NOTE_CONTENT_LENGTH_OVER(400, "감사 일기 내용 글자수 초과"),
	THANK_NOTE_NOT_SAVED(404, "감사 일기 등록 오류"),
	THANK_NOTE_NOT_FOUND(400, "존재하지 않는 감사 일기"),

	;

	private final int code;
	private final String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
