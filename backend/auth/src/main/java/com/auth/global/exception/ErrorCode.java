package com.auth.global.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {

    //JWT 에러
    NOT_VALID_TOKEN(403, "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(403, "만료된 토큰입니다."),
    INVALID_REFRESH_TOKEN(401, "유효하지 않은 리프레시 토큰입니다."),

    // Member 에러,
    NO_SUCH_MEMBER(404, "존재하지 않는 회원입니다."),
    NOT_MATCH_PASSWORD(400, "비밀번호가 일치하지 않습니다."),
    DUPLICATED_EMAIL(400, "이미 존재하는 이메일입니다.")

    ;



    private final int code;
    private final String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

}
