package com.notification.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

	FAIL_MAKE_PUSH_MESSAGE(500, "푸시 알림 메시지 만들기 실패"),
	;

	private final int code;
	private final String message;

	ErrorCode(int code, String message) {
		this.code = code;
		this.message = message;
	}

}
