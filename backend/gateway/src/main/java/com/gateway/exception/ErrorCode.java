package com.gateway.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    //JWT 에러
    NOT_VALID_TOKEN(403, "유효하지 않은 토큰입니다."),

    ;

    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
