package com.tori.global.exception.handler;

import com.tori.global.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ToriException extends RuntimeException {

    private final ErrorCode errorCode;

}
