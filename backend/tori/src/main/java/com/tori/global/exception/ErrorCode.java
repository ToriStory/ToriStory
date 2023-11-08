package com.tori.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	// 토리 도감 에러
	TORI_NOT_FOUND(404, "존재하지 않는 토리"),
	TORI_ALREADY_ADOPT(400, "이미 입양한 토리"),

	// 도토리 에러
	DOTORI_NOT_ENOUGH(400, "도토리 부족"),
	
	// 바구니 에러
	FEED_ALREADY_EXIST(400, "이미 먹이 존재"),
	LETTER_NOT_FOUND(400, "존재하지 않는 쪽지"),

	;

	private final int code;
	private final String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
