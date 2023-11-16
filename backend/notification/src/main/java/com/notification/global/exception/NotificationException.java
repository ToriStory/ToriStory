package com.notification.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NotificationException extends RuntimeException {

	private final ErrorCode errorCode;

}
